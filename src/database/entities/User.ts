import { Entity, Property } from '@mikro-orm/core';
import BaseEntity from './BaseEntity';

@Entity()
export class User extends BaseEntity {
    constructor(name: string, email: string, passwordHash: string, isActive: boolean) {
        super();
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.isActive = isActive;
    }

    @Property({ length: 256 })
    name: string;

    @Property({ unique: true })
    email: string;

    @Property()
    passwordHash: string;

    @Property()
    isActive: boolean;
}
