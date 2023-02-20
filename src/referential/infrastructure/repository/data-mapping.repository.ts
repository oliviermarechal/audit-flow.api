import {
    DataMappingRepositoryInterface,
    ReferentialDataMapping,
} from '../../domain';
import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../../../core/app';
import { Pool } from 'pg';
import { objectKeysToCamelCase } from '../../../core/app/tools';

@Injectable()
export class DataMappingRepository implements DataMappingRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async save(
        dataMapping: ReferentialDataMapping,
    ): Promise<ReferentialDataMapping> {
        const result = await this.pool.query(
            'INSERT INTO referential_data_mapping (referential_criteria, identifier, label, category, description, version_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [
                dataMapping.referentialCriteria,
                dataMapping.identifier,
                dataMapping.label,
                dataMapping.category,
                dataMapping.description,
                dataMapping.versionId,
            ],
        );

        return objectKeysToCamelCase<ReferentialDataMapping>(result.rows[0]);
    }

    async findByVersion(versionId: string): Promise<ReferentialDataMapping> {
        const rows = (
            await this.pool.query(
                'SELECT * FROM referential_data_mapping rdm WHERE rdm.version_id = $1',
                [versionId],
            )
        ).rows;

        if (rows?.length > 0) {
            return objectKeysToCamelCase<ReferentialDataMapping>(rows[0]);
        }
    }

    async removeFromVersion(versionId: string): Promise<void> {
        await this.pool.query(
            `DELETE FROM referential_data_mapping WHERE version_id = $1`,
            [versionId],
        );
    }
}
