import { Inject, Service } from 'typedi';
import { MikroORM, EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

@Service()
export default class Transaction {
    private em: EntityManager<IDatabaseDriver<Connection>>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.em = orm.em;
    }

    commit(): Promise<void> {
        return this.em.flush();
    }
}
