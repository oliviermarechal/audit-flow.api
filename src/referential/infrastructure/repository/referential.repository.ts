import {
    ReferentialRepositoryInterface,
    Referential,
    ReferentialVersionRepositoryInterface,
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
        @Inject(ReferentialVersionRepositoryInterface)
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) {}

    async create(referential: Referential): Promise<Referential> {
        const result = await this.pool.query(
            'INSERT INTO referential (label, url, description) VALUES ($1, $2, $3)',
            [referential.label, referential.url, referential.description],
        );

        return objectKeysToCamelCase<Referential>(result.rows[0]);
    }

    async findAll(): Promise<Referential[]> {
        const rows = (await this.pool.query('SELECT * FROM referential r'))
            .rows;

        return Promise.all(
            rows.map(async (r) => {
                const referential = await objectKeysToCamelCase<Referential>(r);
                referential.versions =
                    await this.referentialVersionRepository.findByReferential(
                        referential.id,
                    );

                return referential;
            }),
        );
    }

    async find(id: string): Promise<Referential> {
        const rows = (
            await this.pool.query('SELECT * FROM referential r WHERE id = $1', [
                id,
            ])
        ).rows;

        if (rows?.length > 0) {
            return objectKeysToCamelCase<Referential>(rows[0]);
        }
    }
}
