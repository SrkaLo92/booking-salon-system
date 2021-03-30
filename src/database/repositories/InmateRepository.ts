import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { InmateContact } from '../entities/InmateContact';

@Service()
export default class InmateRepository {
    private ormRepository: EntityRepository<InmateContact>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(InmateContact);
    }

    persistContact(contact: InmateContact): void {
        this.ormRepository.persist(contact);
    }
}
