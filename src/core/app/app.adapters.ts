import { Pool } from 'pg';
import { JwtStrategy } from './strategy';
import { JwtGuard } from './guard';

export const DB_PROVIDER = 'DB_PROVIDER';

export const AppAdapters = [
    {
        provide: DB_PROVIDER,
        useFactory: () => {
            return new Pool({
                host: process.env.DATABASE_HOST,
                database: process.env.DATABASE_NAME,
                user: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                port: Number(process.env.DATABASE_PORT),
            });
        },
    },
];
