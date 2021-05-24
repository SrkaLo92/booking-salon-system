import { Service } from 'typedi';
import UserImageRepository from '../database/repositories/UserImageRepository';
import { MeImage } from '../interfaces/Image';
import { to } from '../util/awaitTo';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class UserImageService {
    constructor(private userImageRepository: UserImageRepository) {}

    public async getUserImage(userId: number): Promise<MeImage> {
        const [findUserImageErr, userImage] = await to(this.userImageRepository.findUserImageByUserId(userId));
        if (findUserImageErr) throw findUserImageErr;
        if (!userImage) throw new NotFoundError(`There is no image for user with id ${userId}`);

        return userImage;
    }

    public async uploadUserImage(userId: number, image: Buffer, mimetype: string): Promise<void> {
        const [saveImageErr] = await to(this.userImageRepository.saveImage(userId, image, mimetype));
        if (saveImageErr) throw saveImageErr;
    }
}
