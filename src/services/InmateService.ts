import { Service } from 'typedi';
import { InmateContact } from '../database/entities/InmateContact';
import { InmateMailingAddress } from '../database/entities/InmateMailingAddress';
import InmateMailingAddressRepository from '../database/repositories/InmateMailingAddressRepository';
import InmateRepository from '../database/repositories/InmateRepository';
import Transaction from '../database/repositories/Transaction';
import UserRepository from '../database/repositories/UserRepository';
import { InmateContactAdd } from '../interfaces/Inmate';

@Service()
export default class InmateService {
    constructor(
        private inmateRepository: InmateRepository,
        private mailingAddressRepository: InmateMailingAddressRepository,
        private userRepository: UserRepository,
        private transaction: Transaction,
    ) {}

    public async addInmateContact(
        userID: number,
        inmateContactInfo: InmateContactAdd,
        inmateImage: Buffer,
    ): Promise<void> {
        const user = await this.userRepository.getUserById(userID);
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
        );

        this.inmateRepository.persistContact(inmateContact);

        const mailingAddresses = inmateContactInfo.mailingAddresses.map(
            (address, index) => new InmateMailingAddress(inmateContact, index + 1, address),
        );
        this.mailingAddressRepository.persistInmateMailingAddresses(mailingAddresses);

        this.transaction.commit();
    }
}
