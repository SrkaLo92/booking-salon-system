import { Entity, Property } from '@mikro-orm/core';
import BaseEntity from './BaseEntity';

@Entity({ tableName: 'facility' })
export class Facility extends BaseEntity {
    constructor(facilityName: string, state: string, city: string, zipCode: string) {
        super();
        this.facilityName = facilityName;
        this.state = state;
        this.city = city;
        this.zipCode = zipCode;
    }

    @Property({ length: 256 })
    facilityName: string;

    @Property({ length: 100 })
    state: string;

    @Property({ length: 100 })
    city: string;

    @Property({ length: 10 })
    zipCode: string;
}
