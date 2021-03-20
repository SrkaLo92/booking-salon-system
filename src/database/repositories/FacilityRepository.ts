import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { Facility } from '../entities/Facility';

@Service()
export default class FacilityRepository {
    private ormRepository: EntityRepository<Facility>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(Facility);
    }

    getFacilities(): Promise<Facility[]> {
        return this.ormRepository.findAll();
    }
}
