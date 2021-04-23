import { Entity, ManyToOne } from '@mikro-orm/core';
import { BaseImageEntity } from './BaseImageEntity';
import { User } from './User';

@Entity()
export class UserImage extends BaseImageEntity {
    constructor(image: Buffer, mimetype: string, user: User) {
        super(image, mimetype);
        this.user = user;
    }

    @ManyToOne(() => User, { primary: true })
    user: User;
}
