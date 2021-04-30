import { Inject, Service } from 'typedi';
import { PrismaClient } from '.prisma/client';
import { InmateImage } from '../../interfaces/Image';

@Service()
export default class InmateImageRepository {
    constructor(@Inject('db') private prisma: PrismaClient) {}

    saveImage(inmateContactId: number, image: Buffer, mimetype: string): Promise<void> {
        return this.prisma.inmateContactImage
            .upsert({
                create: { image, mimetype, inmateContactId },
                update: { image, mimetype },
                where: { inmateContactId },
            })
            .then();
    }

    findContactImageByContactIdAndUserId(contactId: number, creatorId: number): Promise<InmateImage> {
        return this.prisma.inmateContactImage.findFirst({
            where: {
                inmateContactId: contactId,
                inmateContact: { deleted: false, creatorId },
            },
        });
    }
}
