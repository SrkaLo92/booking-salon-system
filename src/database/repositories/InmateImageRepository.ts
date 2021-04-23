import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { InmateContactImage } from '../entities/InmateContactImage';

@Service()
export default class InmateImageRepository {
    private ormRepository: EntityRepository<InmateContactImage>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(InmateContactImage);
    }

    saveImage(contactImage: InmateContactImage): Promise<void> {
        return this.ormRepository.persistAndFlush(contactImage);
    }

    findContactImageByContactIdAndUserId(contactId: number, userId: number): Promise<InmateContactImage> {
        return this.ormRepository.findOne({
            inmateContact: {
                id: contactId,
                isDeleted: false,
                user: {
                    id: userId,
                },
            },
        });
    }
}
