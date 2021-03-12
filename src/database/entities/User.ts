import { Entity, Column } from 'typeorm';
import BaseEntity from './BaseEntity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
    constructor(name: string, email: string, passwordHash: string, isActive: boolean) {
        super();
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.isActive = isActive;
    }

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ name: 'is_active' })
    isActive: boolean;
}
