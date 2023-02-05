import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_PROVIDER } from '../../../core/app';
import {
    ReferentialVersion,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import { objectKeysToCamelCase } from '../../../core/app/tools';

@Injectable()
export class ReferentialVersionRepository
    implements ReferentialVersionRepositoryInterface
{
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async save(
        referentialVersion: ReferentialVersion,
    ): Promise<ReferentialVersion> {
        const result = await this.pool.query(
            'INSERT INTO referential_version (url, version, version_in_url, sync_mode, updated_at, referential_id) VALUES ($1, $2, $3, $4, $5, $6)',
            [
                referentialVersion.url,
                referentialVersion.version,
                referentialVersion.versionInUrl,
                referentialVersion.syncMode,
                referentialVersion.updatedAt.getUTCDate(),
                referentialVersion.referentialId,
            ],
        );

        return objectKeysToCamelCase<ReferentialVersion>(result.rows[0]);
    }

    async findByReferential(
        referentialId: string,
    ): Promise<ReferentialVersion[] | null> {
        const result = await this.pool.query(
            'SELECT * FROM referential_version WHERE referential_id = $1',
            [referentialId],
        );

        return Promise.all(
            result.rows.map((version) => {
                return objectKeysToCamelCase<ReferentialVersion>(version);
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
}
