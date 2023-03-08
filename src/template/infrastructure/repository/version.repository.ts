import { VersionRepositoryInterface } from '../../domain';
import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../../../core/app';
import { Pool } from 'pg';

@Injectable()
export class VersionRepository implements VersionRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async versionExist(versionId: string): Promise<boolean> {
        const queryResult = await this.pool.query(
            `SELECT COUNT(id) FROM referential_version WHERE id = $1`,
            [versionId],
        );

        return queryResult.rowCount === 1;
    }
}
