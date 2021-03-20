import config from '../../config';
import { MikroORMOptions } from '@mikro-orm/core';

const mikroORMConfig: unknown = {
    dbName: config.database.name,
    type: config.database.type,
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
    entities: ['./dist/database/entities/**/*.js'],
    entitiesTs: ['./src/database/entities/**/*.ts'],
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './src/database/migrations',
        pattern: /^[\w-]+\d+\.ts$/,
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true,
        dropTables: true,
        safe: true,
        emit: 'ts',
    },
};

export default mikroORMConfig as MikroORMOptions;
