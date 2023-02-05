import { AccountRepositoryInterface } from '../../domain/repository';
import { Account } from '../../domain/model';
import { Inject, Injectable } from '@nestjs/common';
import { DB_PROVIDER } from '../../../core/app';
import { Pool } from 'pg';

@Injectable()
export class AccountRepository implements AccountRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async save(account: Account): Promise<Account> {
        const result = await this.pool.query(
            'INSERT INTO account (email, password) VALUES ($1, $2)',
            [account.email, account.password],
        );

        if (result.rowCount === 1) {
            return result.rows[0];
        }

        throw new Error('Error on create account'); // TODO Make domain exception
    }

    async findByEmail(email: string): Promise<Account | null> {
        const rows = (
            await this.pool.query('SELECT * FROM account WHERE email = $1', [
                email,
            ])
        ).rows;

        return rows?.length > 0 ? rows[0] : null;
    }
}
