import { Service } from 'typedi';
import { InmateContact } from '../database/entities/InmateContact';
import { InmateMailingAddress } from '../database/entities/InmateMailingAddress';
import InmateRepository from '../database/repositories/InmateRepository';
import UserRepository from '../database/repositories/UserRepository';
import { InmateContactSave, InmateContactLoad } from '../interfaces/Inmate';
import { to } from '../util/awaitTo';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class InmateService {
    constructor(private inmateRepository: InmateRepository, private userRepository: UserRepository) {}

    public async getInmateContacts(userID: number): Promise<InmateContactLoad[]> {
        const [findContactsErr, contacts] = await to(this.inmateRepository.findContactsByUserId(userID));
        if (findContactsErr) throw findContactsErr;

        return contacts.map(this.convertToInmateContactLoad);
    }

    private convertToInmateContactLoad(contact: InmateContact): InmateContactLoad {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { mailingAddressesArray, user, isDeleted, ...contactInfo } = contact;
        const mailingAddresses = mailingAddressesArray.map(mailingAddress => mailingAddress.mailingAddress);
        return { ...contactInfo, mailingAddresses, user: { id: user.id } };
    }

    public async addInmateContact(
        userID: number,
        inmateContactInfo: InmateContactSave,
        inmateImage: Buffer,
    ): Promise<InmateContactLoad> {
        const [findUserErr, user] = await to(this.userRepository.findUserById(userID));
        if (findUserErr) throw findUserErr;

        const inmateContact = new InmateContact(
            inmateContactInfo.firstName,
            inmateContactInfo.lastName,
            inmateContactInfo.inmateId,
            inmateImage,
            inmateContactInfo.facilityName,
            inmateContactInfo.facilityState,
            inmateContactInfo.facilityCity,
            inmateContactInfo.facilityZipCode,
            user,
            this.convertToMailingAddresses(inmateContactInfo.mailingAddresses),
        );

        const [saveContactErr] = await to(this.inmateRepository.saveContact(inmateContact));
        if (saveContactErr) throw saveContactErr;

        return this.convertToInmateContactLoad(inmateContact);
    }

    public async editInmateContact(
        userID: number,
        contactId: number,
        inmateContactInfo: InmateContactSave,
        inmateImage: Buffer,
    ): Promise<InmateContactLoad> {
        const [findContactErr, existingInmateContact] = await to(
            this.inmateRepository.findContactByIdAndUserId(contactId, userID),
        );
        if (findContactErr) throw findContactErr;
        if (!existingInmateContact) throw new NotFoundError(`There is no inmate contact with id ${contactId}`);

        existingInmateContact.firstName = inmateContactInfo.firstName;
        existingInmateContact.lastName = inmateContactInfo.lastName;
        existingInmateContact.inmateId = inmateContactInfo.inmateId;
        existingInmateContact.contactImage = inmateImage;
        existingInmateContact.facilityName = inmateContactInfo.facilityName;
        existingInmateContact.facilityState = inmateContactInfo.facilityState;
        existingInmateContact.facilityCity = inmateContactInfo.facilityCity;
        existingInmateContact.facilityZipCode = inmateContactInfo.facilityZipCode;
        existingInmateContact.mailingAddressesArray = this.convertToMailingAddresses(
            inmateContactInfo.mailingAddresses,
        );

        const [saveContactErr] = await to(this.inmateRepository.saveContact(existingInmateContact));
        if (saveContactErr) throw saveContactErr;

        return this.convertToInmateContactLoad(existingInmateContact);
    }

    private convertToMailingAddresses(mailingAddresses: string[]) {
        return mailingAddresses.map((address, index) => new InmateMailingAddress(index + 1, address));
    }

    public async deleteInmateContact(userID: number, contactId: number): Promise<void> {
        const [findContactErr, existingInmateContact] = await to(
            this.inmateRepository.findContactByIdAndUserId(contactId, userID),
        );
        if (findContactErr) throw findContactErr;
        if (!existingInmateContact) throw new NotFoundError(`There is no inmate contact with id ${contactId}`);

        const [deleteUserErr] = await to(this.inmateRepository.deleteContact(existingInmateContact));
        if (deleteUserErr) throw deleteUserErr;
    }
}
