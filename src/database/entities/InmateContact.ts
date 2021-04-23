import { Entity, Property, ManyToOne, OneToMany, Collection, QueryOrder, Cascade } from '@mikro-orm/core';
import BaseDeletableEntity from './BaseDeleteableEntity';
import { InmateMailingAddress } from './InmateMailingAddress';
import { User } from './User';

@Entity()
export class InmateContact extends BaseDeletableEntity {
    constructor(
        firstName: string,
        lastName: string,
        inmateID: string,
        facilityName: string,
        facilityState: string,
        facilityCity: string,
        facilityZipCode: string,
        user: User,
        mailingAddresses: InmateMailingAddress[],
    ) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.inmateId = inmateID;
        this.user = user;
        this.facilityName = facilityName;
        this.facilityState = facilityState;
        this.facilityCity = facilityCity;
        this.facilityZipCode = facilityZipCode;
        mailingAddresses.forEach(mailingAddress => (mailingAddress.inmateContact = this));
        this.mailingAddresses = new Collection(this, mailingAddresses);
    }

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property()
    inmateId: string;

    @Property()
    facilityName: string;

    @Property({ length: 100 })
    facilityState: string;

    @Property({ length: 100 })
    facilityCity: string;

    @Property({ length: 10 })
    facilityZipCode: string;

    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => InmateMailingAddress, mailingAddress => mailingAddress.inmateContact, {
        orderBy: { order: QueryOrder.ASC },
        cascade: [Cascade.PERSIST],
    })
    mailingAddresses: Collection<InmateMailingAddress, this>;

    get mailingAddressesArray(): InmateMailingAddress[] {
        return this.mailingAddresses.getItems();
    }
    set mailingAddressesArray(mailingAddresses: InmateMailingAddress[]) {
        this.mailingAddresses.getItems().forEach((mailingAddress, index) => {
            mailingAddress.mailingAddress = mailingAddresses[index].mailingAddress;
        });
    }
}
