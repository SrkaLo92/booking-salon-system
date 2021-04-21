import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository, QueryOrder } from '@mikro-orm/core';
import { InmateContact } from '../entities/InmateContact';

@Service()
export default class InmateRepository {
    private ormRepository: EntityRepository<InmateContact>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(InmateContact);
    }

    saveContact(contact: InmateContact): Promise<void> {
        contact.isDeleted = false;
        return this.ormRepository.persistAndFlush(contact);
    }

    findContactsByUserId(userId: number): Promise<InmateContact[]> {
        return this.ormRepository.find(
            { user: { id: userId }, isDeleted: false },
            { orderBy: { createdAt: QueryOrder.DESC }, populate: ['mailingAddresses'] },
        );
    }

    findContactByIdAndUserId(contactId: number, userId: number): Promise<InmateContact> {
        return this.ormRepository.findOne(
            { user: { id: userId }, id: contactId, isDeleted: false },
            { populate: ['mailingAddresses'] },
        );
    }

    deleteContact(contact: InmateContact): Promise<void> {
        contact.isDeleted = true;
        return this.ormRepository.persistAndFlush(contact);
    }
}
