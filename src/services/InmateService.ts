import { Service } from 'typedi';
import InmateRepository from '../database/repositories/InmateRepository';
import { InmateContactSave, InmateContactLoad, ContactSelect, ContactUpsert } from '../interfaces/Inmate';
import { to } from '../util/awaitTo';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class InmateService {
    constructor(private inmateRepository: InmateRepository) {}

    public async getInmateContacts(userId: number): Promise<InmateContactLoad[]> {
        const [findContactsErr, contacts] = await to(this.inmateRepository.findContactsByUserId(userId));
        if (findContactsErr) throw findContactsErr;

        return contacts.map(this.convertToInmateContactLoad);
    }

    public async addInmateContact(userId: number, inmateContactSave: InmateContactSave): Promise<InmateContactLoad> {
        const { mailingAddresses, ...inmateContactInfo } = inmateContactSave;

        const inmateContact: ContactUpsert = {
            ...inmateContactInfo,
            mailingAddresses: this.convertToMailingAddresses(mailingAddresses),
        };

        const [createContactErr, contactId] = await to(this.inmateRepository.createContact(userId, inmateContact));
        if (createContactErr) throw createContactErr;

        return this.convertToInmateContactLoad({ id: contactId, ...inmateContact });
    }

    public async editInmateContact(
        userId: number,
        contactId: number,
        inmateContactSave: InmateContactSave,
    ): Promise<InmateContactLoad> {
        const [findContactErr, inmateContactExists] = await to(
            this.inmateRepository.existsContactByIdAndUserId(contactId, userId),
        );
        if (findContactErr) throw findContactErr;
        if (!inmateContactExists) throw new NotFoundError(`There is no inmate contact with id ${contactId}`);

        const { mailingAddresses, ...inmateContactInfo } = inmateContactSave;

        const inmateContact: ContactUpsert = {
            ...inmateContactInfo,
            mailingAddresses: this.convertToMailingAddresses(mailingAddresses),
        };

        const [saveContactErr] = await to(this.inmateRepository.updateContact(contactId, inmateContact));
        if (saveContactErr) throw saveContactErr;

        return this.convertToInmateContactLoad({ id: contactId, ...inmateContact });
    }

    public async deleteInmateContact(userId: number, contactId: number): Promise<void> {
        const [findContactErr, inmateContactExists] = await to(
            this.inmateRepository.existsContactByIdAndUserId(contactId, userId),
        );
        if (findContactErr) throw findContactErr;
        if (!inmateContactExists) throw new NotFoundError(`There is no inmate contact with id ${contactId}`);

        const [deleteUserErr] = await to(this.inmateRepository.deleteContact(contactId));
        if (deleteUserErr) throw deleteUserErr;
    }

    private convertToInmateContactLoad(contact: ContactSelect): InmateContactLoad {
        const { mailingAddresses, ...contactInfo } = contact;
        return {
            ...contactInfo,
            mailingAddresses: mailingAddresses.map(address => address.mailingAddress),
        };
    }

    private convertToMailingAddresses(mailingAddresses: string[]) {
        return mailingAddresses.map((address, index) => ({ order: index + 1, mailingAddress: address }));
    }
}
