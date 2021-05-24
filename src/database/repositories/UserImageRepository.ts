import { Inject, Service } from 'typedi';
import { PrismaClient } from '.prisma/client';
import { MeImage } from '../../interfaces/Image';

@Service()
export default class UserImageRepository {
    constructor(@Inject('db') private prisma: PrismaClient) {}

    saveImage(userId: number, image: Buffer, mimetype: string): Promise<void> {
        return this.prisma.userImage
            .upsert({
                create: { image, mimetype, userId },
                update: { image, mimetype },
                where: { userId },
            })
            .then();
    }

    findUserImageByUserId(userId: number): Promise<MeImage> {
        return this.prisma.userImage.findFirst({
            where: {
                userId,
                user: { deleted: false },
            },
        });
    }
}
