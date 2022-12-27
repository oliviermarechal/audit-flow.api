import { DataSource } from 'typeorm';
import dataSourceOptions from './typeorm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default new DataSource(dataSourceOptions as PostgresConnectionOptions);
