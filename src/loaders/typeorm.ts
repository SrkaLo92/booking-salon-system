import { createConnection, Connection } from 'typeorm';
import config from '../config';

export default (): Promise<Connection> => {
    return createConnection({
        type: 'postgres',
        host: config.database.host,
        port: Number(config.database.port),
        username: config.database.username,
        password: config.database.password,
        database: config.database.name,
        entities: ['src/database/entities/*.ts'],
    });
};
