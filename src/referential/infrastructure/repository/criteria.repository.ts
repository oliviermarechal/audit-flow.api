import { CriteriaRepositoryInterface, Criteria } from '../../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_PROVIDER } from '../../../core/app';

@Injectable()
export class CriteriaRepository implements CriteriaRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async save(criteria: Criteria): Promise<Criteria> {
        await this.pool.query(
            'INSERT INTO criteria (label, externalId, category, implement, control, referentialId) VALUES ($1, $2, $3, $4, $5, $6)',
            [
                criteria.label,
                criteria.externalId,
                criteria.category,
                criteria.implement,
                criteria.control,
                criteria.referentialId,
            ],
        );

        return criteria;
    }

    async findAll(): Promise<Criteria[]> {
        return (await this.pool.query('SELECT * FROM criteria')).rows;
    }
}
