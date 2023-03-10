import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_PROVIDER } from '../../../core/app';
import {
    DataMappingRepositoryInterface,
    ReferentialDataMapping,
    ReferentialDataMappingProps,
    ReferentialVersion,
    ReferentialVersionProps,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../domain';
import { objectKeysToCamelCase } from '../../../core/app/tools';

@Injectable()
export class ReferentialVersionRepository
    implements ReferentialVersionRepositoryInterface
{
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
        @Inject(DataMappingRepositoryInterface)
        private readonly dataMappingRepository: DataMappingRepositoryInterface,
    ) {}

    async find(id: string): Promise<ReferentialVersion> {
        const rows = (
            await this.pool.query(
                `SELECT 
                rv.*,
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
                END as data_mapping
                FROM referential_version rv
                LEFT JOIN referential_data_mapping dm ON dm.version_id = rv.id
                WHERE id = $1`,
                [id],
            )
        ).rows;

        if (rows?.length > 0) {
            const { data_mapping, ...versionData } = rows[0];
            const formattedVersion =
                await objectKeysToCamelCase<ReferentialVersionProps>(
                    versionData,
                );

            if (data_mapping) {
                formattedVersion.dataMapping = ReferentialDataMapping.create(
                    await objectKeysToCamelCase<ReferentialDataMappingProps>(
                        data_mapping,
                    ),
                );
            }

            return ReferentialVersion.create(formattedVersion);
        }
    }

    async save(
        referentialVersion: ReferentialVersion,
    ): Promise<ReferentialVersion> {
        const result = await this.pool.query(
            'INSERT INTO referential_version (url, version, sync_mode, updated_at, status, referential_id) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, $5)  RETURNING *',
            [
                referentialVersion.url,
                referentialVersion.version,
                referentialVersion.syncMode,
                referentialVersion.status,
                referentialVersion.referentialId,
            ],
        );

        let dataMapping: ReferentialDataMapping;
        if (referentialVersion.dataMapping) {
            if (result.rows) {
                referentialVersion.dataMapping.versionId = result.rows[0]['id'];
                dataMapping = await this.dataMappingRepository.save(
                    referentialVersion.dataMapping,
                );
            }
        }

        const savedVersion = await objectKeysToCamelCase<ReferentialVersion>(
            result.rows[0],
        );
        savedVersion.dataMapping = dataMapping;

        return savedVersion;
    }

    async updateStatus(
        versionId: string,
        status: ReferentialVersionStatusEnum,
    ): Promise<ReferentialVersion> {
        const result = await this.pool.query(
            'UPDATE referential_version SET status = $1 WHERE id = $2 RETURNING *',
            [status, versionId],
        );

        return objectKeysToCamelCase<ReferentialVersion>(result.rows[0]);
    }

    async update(version: ReferentialVersion): Promise<ReferentialVersion> {
        const result = await this.pool.query(
            `UPDATE referential_version
            SET url = $1, version = $2, sync_mode = $3, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $4
            RETURNING *`,
            [version.url, version.version, version.syncMode, version.id],
        );

        if (version.dataMapping) {
            const existing = await this.dataMappingRepository.findByVersion(
                version.id,
            );

            if (!version.dataMapping.equals(existing)) {
                await this.dataMappingRepository.removeFromVersion(version.id);
                await this.dataMappingRepository.save(version.dataMapping);
            }
        }

        const updated = await objectKeysToCamelCase<ReferentialVersion>(
            result.rows[0],
        );

        updated.dataMapping = version.dataMapping
            ? await this.dataMappingRepository.findByVersion(updated.id)
            : null;

        return updated;
    }

    async findByReferential(
        referentialId: string,
    ): Promise<ReferentialVersion[] | null> {
        const result = await this.pool.query(
            'SELECT * FROM referential_version WHERE referential_id = $1',
            [referentialId],
        );

        return Promise.all(
            result.rows.map(async (version) => {
                const formatted =
                    await objectKeysToCamelCase<ReferentialVersion>(version);
                formatted.dataMapping =
                    await this.dataMappingRepository.findByVersion(
                        formatted.id,
                    );

                return formatted;
            }),
        );
    }

    async findByVersion(
        referentialId: string,
        version: string,
    ): Promise<ReferentialVersion> {
        const result = await this.pool.query(
            'SELECT * FROM referential_version WHERE referential_id = $1 AND version = $2',
            [referentialId, version],
        );

        if (result.rowCount > 0) {
            return objectKeysToCamelCase<ReferentialVersion>(result.rows[0]);
        }
    }

    async remove(id: string): Promise<void> {
        await this.pool.query(`DELETE FROM criteria WHERE version_id = $1`, [
            id,
        ]);

        await this.pool.query(`DELETE FROM referential_version WHERE id = $1`, [
            id,
        ]);
    }

    async isOwner(versionId: string, userId: string): Promise<boolean> {
        const result = await this.pool.query(
            'SELECT r.owner_id as owner_id FROM referential_version v LEFT JOIN referential r ON r.id = v.referential_id WHERE v.id = $1',
            [versionId],
        );

        return result.rows[0]['owner_id'] === userId;
    }
}
