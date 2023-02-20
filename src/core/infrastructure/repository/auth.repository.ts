import { AuthRepositoryInterface } from '../../domain/repository';
import { Pool } from 'pg';
import { Inject, Injectable } from '@nestjs/common';
import { LoggedUserInterface } from '../../domain/interfaces/security';
import { DB_PROVIDER } from '../../app';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}

    async findUserById(id: string): Promise<LoggedUserInterface> {
        const queryResult = await this.pool.query(
            'SELECT id, email FROM account WHERE id = $1',
            [id],
        );

        if (queryResult.rowCount === 0) {
            return null;
        }

        return queryResult.rows[0];
    }
}
