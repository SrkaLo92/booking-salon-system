import { MikroORM } from '@mikro-orm/core';
import config from '../database/config/mikro-orm.config';

export default (): Promise<MikroORM> => {
    return MikroORM.init(config);
};
