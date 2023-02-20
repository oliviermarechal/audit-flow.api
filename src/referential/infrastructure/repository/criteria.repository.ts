import {
    CriteriaRepositoryInterface,
    Criteria,
    CriteriaProps,
} from '../../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_PROVIDER } from '../../../core/app';
import { objectKeysToCamelCase } from '../../../core/app/tools';

@Injectable()
export class CriteriaRepository implements CriteriaRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async save(criteria: Criteria): Promise<Criteria> {
        const result = await this.pool.query(
            'INSERT INTO criteria (label, external_id, category, description, version_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                criteria.label,
                criteria.externalId,
                criteria.category,
                criteria.description,
                criteria.versionId,
            ],
        );

        return this.formatCriteria(result.rows[0]);
    }

    async update(criteria: Criteria): Promise<Criteria> {
        const result = await this.pool.query(
            `UPDATE criteria SET label = $1, external_id = $2, category = $3, description = $4 WHERE id = $5 RETURNING *`,
            [
                criteria.label,
                criteria.externalId,
                criteria.category,
                criteria.description,
                criteria.id,
            ],
        );

        return this.formatCriteria(result.rows[0]);
    }

    async find(id: string): Promise<Criteria> {
        const result = await this.pool.query(
            `SELECT * FROM criteria WHERE id = $1`,
            [id],
        );

        return this.formatCriteria(result.rows[0]);
    }

    async findAll(): Promise<Criteria[]> {
        return Promise.all(
            (await this.pool.query('SELECT * FROM criteria')).rows.map(
                async (r) => this.formatCriteria(r),
            ),
        );
    }

    async findByVersion(versionId: string): Promise<Criteria[]> {
        const result = await this.pool.query(
            `SELECT * FROM criteria c WHERE c.version_id = $1`,
            [versionId],
        );

        if (result.rowCount > 0) {
            return Promise.all(
                result.rows.map(async (r) => this.formatCriteria(r)),
            );
        }

        return [];
    }

    async remove(id: string): Promise<void> {
        await this.pool.query(`DELETE FROM criteria WHERE id = $1`, [id]);
    }

    async formatCriteria(row): Promise<Criteria> {
        return Criteria.create(await objectKeysToCamelCase<CriteriaProps>(row));
    }
}
