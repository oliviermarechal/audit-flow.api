import {
    ReferentialRepositoryInterface,
    Referential,
    ReferentialProps,
    ReferentialVersion,
    ReferentialDataMapping,
    ReferentialDataMappingProps,
    ReferentialVersionProps,
} from '../../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_PROVIDER } from '../../../core/app';
import { objectKeysToCamelCase } from '../../../core/app/tools';

@Injectable()
export class ReferentialRepository implements ReferentialRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async create(referential: Referential): Promise<Referential> {
        const result = await this.pool.query(
            'INSERT INTO referential (label, url, description, is_public, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                referential.label,
                referential.url,
                referential.description,
                referential.isPublic,
                referential.ownerId,
            ],
        );

        return this.formatReferential(result.rows[0]);
    }

    async update(referential: Referential): Promise<Referential> {
        const result = await this.pool.query(
            `UPDATE referential SET label = $1, description = $2, url = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
            [
                referential.label,
                referential.description,
                referential.url,
                referential.id,
            ],
        );

        return this.formatReferential(result.rows[0]);
    }

    async findByOwnerOrPublic(ownerId: string): Promise<Referential[]> {
        const rows = (
            await this.pool.query(
                `SELECT
                     r.*,
                     CASE WHEN COUNT(rv) > 0 THEN
                              array_agg(json_build_object(
                                      'id', rv.id,
                                      'version', rv.version,
                                      'url', rv.url,
                                      'sync_mode', rv.sync_mode,
                                      'status', rv.status,
                                      'created_at', rv.created_at,
                                      'updated_at', rv.updated_at,
                                      'referential_id', rv.referential_id,
                                      'data_mapping',
                                      CASE WHEN dm IS NOT NULL THEN
                                               json_build_object(
                                                       'referential_criteria', dm.referential_criteria,
                                                       'identifier', dm.identifier,
                                                       'label', dm.label,
                                                       'category', dm.category,
                                                       'description', dm.description,
                                                       'version_id', dm.version_id
                                                   )
                                           ELSE NULL
                                          END
                                  ))
                          ELSE NULL
                         END as versions
                    FROM referential r 
                    LEFT JOIN referential_version as rv ON rv.referential_id = r.id 
                    LEFT JOIN referential_data_mapping as dm ON dm.version_id = rv.id 
                    WHERE r.is_public IS TRUE OR r.owner_id = $1 
                    GROUP BY r.id`,
                [ownerId],
            )
        ).rows;

        return Promise.all(
            rows.map(async (r) => {
                return this.formatReferential(r);
            }),
        );
    }

    async findAll(): Promise<Referential[]> {
        const rows = (
            await this.pool.query(
                `SELECT
                     r.*,
                     CASE WHEN COUNT(rv) > 0 THEN
                              array_agg(json_build_object(
                                      'id', rv.id,
                                      'version', rv.version,
                                      'url', rv.url,
                                      'sync_mode', rv.sync_mode,
                                      'status', rv.status,
                                      'created_at', rv.created_at,
                                      'updated_at', rv.updated_at,
                                      'referential_id', rv.referential_id,
                                      'data_mapping',
                                      CASE WHEN dm IS NOT NULL THEN
                                               json_build_object(
                                                       'referential_criteria', dm.referential_criteria,
                                                       'identifier', dm.identifier,
                                                       'label', dm.label,
                                                       'category', dm.category,
                                                       'description', dm.description,
                                                       'version_id', dm.version_id
                                                   )
                                           ELSE NULL
                                          END
                                  ))
                          ELSE NULL
                         END as versions
                    FROM referential r 
                    LEFT JOIN referential_version as rv ON rv.referential_id = r.id
                    LEFT JOIN referential_data_mapping as dm ON dm.version_id = rv.id
                 GROUP BY r.id `,
            )
        ).rows;

        return Promise.all(
            rows.map(async (r) => {
                return this.formatReferential(r);
            }),
        );
    }

    async find(id: string): Promise<Referential> {
        const rows = (
            await this.pool.query(
                `SELECT
                     r.*,
                     CASE WHEN COUNT(rv) > 0 THEN
                              array_agg(json_build_object(
                                      'id', rv.id,
                                      'version', rv.version,
                                      'url', rv.url,
                                      'sync_mode', rv.sync_mode,
                                      'status', rv.status,
                                      'created_at', rv.created_at,
                                      'updated_at', rv.updated_at,
                                      'referential_id', rv.referential_id,
                                      'data_mapping',
                                      CASE WHEN dm IS NOT NULL THEN
                                               json_build_object(
                                                       'referential_criteria', dm.referential_criteria,
                                                       'identifier', dm.identifier,
                                                       'label', dm.label,
                                                       'category', dm.category,
                                                       'description', dm.description,
                                                       'version_id', dm.version_id
                                                   )
                                           ELSE NULL
                                          END
                                  ))
                          ELSE NULL
                         END as versions
                    FROM referential r 
                    LEFT JOIN referential_version as rv ON rv.referential_id = r.id
                    LEFT JOIN referential_data_mapping as dm ON dm.version_id = rv.id
                    WHERE r.id = $1
                    GROUP BY r.id `,
                [id],
            )
        ).rows;

        if (rows?.length > 0) {
            return this.formatReferential(rows[0]);
        }
    }

    private async formatReferential(rowData: any): Promise<Referential> {
        const referential = Referential.create(
            await objectKeysToCamelCase<ReferentialProps>(rowData),
        );
        const versions: ReferentialVersion[] = [];
        if (rowData.hasOwnProperty('versions')) {
            for (const jsonVersion of rowData.versions || []) {
                const { data_mapping, ...versionData } = jsonVersion;
                const formattedVersion =
                    await objectKeysToCamelCase<ReferentialVersionProps>(
                        versionData,
                    );

                if (data_mapping) {
                    formattedVersion.dataMapping =
                        ReferentialDataMapping.create(
                            await objectKeysToCamelCase<ReferentialDataMappingProps>(
                                data_mapping,
                            ),
                        );
                }
                const version = ReferentialVersion.create(formattedVersion);

                versions.push(version);
            }
        }
        referential.versions = versions;

        return referential;
    }
}
