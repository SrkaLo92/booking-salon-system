import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { InmateMailingAddress } from '../entities/InmateMailingAddress';

@Service()
export default class InmateMailingAddressRepository {
    private ormRepository: EntityRepository<InmateMailingAddress>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(InmateMailingAddress);
    }

    persistInmateMailingAddresses(mailingAddressesses: InmateMailingAddress[]): void {
        this.ormRepository.persist(mailingAddressesses);
    }
}
