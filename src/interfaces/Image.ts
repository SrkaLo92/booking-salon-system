import { InmateContactImage, UserImage } from '.prisma/client';

export type ImageLoad = {
    image: Buffer;
    mimetype: string;
};

export type InmateImage = InmateContactImage;
export type MeImage = UserImage;
