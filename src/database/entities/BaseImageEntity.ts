import { Entity, Property, BlobType } from '@mikro-orm/core';

@Entity({ abstract: true })
export class BaseImageEntity {
    constructor(image: Buffer, mimetype: string) {
        this.image = image;
        this.mimetype = mimetype;
    }

    @Property({ type: BlobType })
    image: Buffer;

    @Property()
    mimetype: string;
}
