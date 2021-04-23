import { Entity, ManyToOne } from '@mikro-orm/core';
import { InmateContact } from './InmateContact';
import { BaseImageEntity } from './BaseImageEntity';

@Entity()
export class InmateContactImage extends BaseImageEntity {
    constructor(image: Buffer, mimetype: string, inmateContact: InmateContact) {
        super(image, mimetype);
        this.inmateContact = inmateContact;
    }

    @ManyToOne(() => InmateContact, { primary: true })
    inmateContact: InmateContact;
}
