import { PrismaClient } from '.prisma/client';
import { Inject, Service } from 'typedi';
import { ContactSelect, ContactUpsert } from '../../interfaces/Inmate';
import { Sort } from '../../util/constants';

const contactColumns = {
    id: true,
    firstName: true,
    lastName: true,
    inmateId: true,
    facilityName: true,
    facilityState: true,
    facilityCity: true,
    facilityZipCode: true,
    mailingAddresses: { select: { mailingAddress: true }, orderBy: { mailingAddress: Sort.asc } },
};

@Service()
export default class InmateRepository {
    constructor(@Inject('db') private prisma: PrismaClient) {}

    createContact(creatorId: number, contact: ContactUpsert): Promise<number> {
        const { mailingAddresses, ...contactData } = contact;
        return this.prisma.inmateContact
            .create({
                select: { id: true },
                data: {
                    ...contactData,
                    creatorId,
                    deleted: false,
                    mailingAddresses: {
                        createMany: {
                            data: mailingAddresses,
                        },
                    },
                },
            })
            .then(contact => contact.id);
    }

    updateContact(contactId: number, contact: ContactUpsert): Promise<void> {
        const { mailingAddresses, ...contactData } = contact;

        return this.prisma.inmateContact
            .update({
                where: { id: contactId },
                data: {
                    ...contactData,
                    mailingAddresses: {
                        deleteMany: {},
                        createMany: { data: mailingAddresses },
                    },
                },
            })
            .then();
    }

    findContactsByUserId(creatorId: number): Promise<ContactSelect[]> {
        return this.prisma.inmateContact.findMany({
            select: contactColumns,
            where: { creatorId, deleted: false },
            orderBy: { createdAt: Sort.desc },
        });
    }

    existsContactByIdAndUserId(contactId: number, creatorId: number): Promise<boolean> {
        return this.prisma.inmateContact
            .count({
                where: { id: contactId, deleted: false, creatorId: creatorId },
            })
            .then(count => count > 0);
    }

    deleteContact(contactId: number): Promise<void> {
        return this.prisma.inmateContact
            .update({
                where: { id: contactId },
                data: { deleted: true },
            })
            .then();
    }
}
