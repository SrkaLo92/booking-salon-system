import { Entity, Property, ManyToOne, OneToMany } from '@mikro-orm/core';
import BaseEntity from './BaseEntity';
import { InmateMailingAddress } from './InmateMailingAddress';
import { User } from './User';

@Entity()
export class InmateContact extends BaseEntity {
    constructor(
        firstName: string,
        lastName: string,
        inmateID: string,
        contactImage: Buffer,
        facilityName: string,
        facilityState: string,
        facilityCity: string,
        facilityZipCode: string,
        user: User,
    ) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.inmateId = inmateID;
        this.contactImage = contactImage;
        this.user = user;
        this.facilityName = facilityName;
        this.facilityState = facilityState;
        this.facilityCity = facilityCity;
        this.facilityZipCode = facilityZipCode;
    }

    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property()
    inmateId: string;

    @Property({ type: 'bytea', nullable: true })
    contactImage: Buffer;

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

    @OneToMany(() => InmateMailingAddress, mailingAddress => mailingAddress.inmateContact)
    mailingAddresses: InmateMailingAddress[];
}
