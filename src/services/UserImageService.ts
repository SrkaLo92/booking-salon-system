import { Service } from 'typedi';
import { UserImage } from '../database/entities/UserImage';
import UserImageRepository from '../database/repositories/UserImageRepository';
import UserRepository from '../database/repositories/UserRepository';
import { to } from '../util/awaitTo';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class UserImageService {
    constructor(private userImageRepository: UserImageRepository, private userRepository: UserRepository) {}

    public async getUserImage(userId: number): Promise<UserImage> {
        const [findUserImageErr, userImage] = await to(this.userImageRepository.findUserImageByUserId(userId));
        if (findUserImageErr) throw findUserImageErr;
        if (!userImage) throw new NotFoundError(`There is no image for user with id ${userId}`);

        return userImage;
    }

    public async uploadUserImage(userId: number, image: Buffer, mimetype: string): Promise<void> {
        const [findUserErr, existingUser] = await to(this.userRepository.findUserById(userId));
        if (findUserErr) throw findUserErr;
        if (!existingUser) throw new NotFoundError(`There is no user with id ${userId}`);

        const [findUserImageErr, existingUserImage] = await to(this.userImageRepository.findUserImageByUserId(userId));
        if (findUserImageErr) throw findUserImageErr;

        let newUserImage;

        if (existingUserImage) {
            existingUserImage.image = image;
            existingUserImage.mimetype = mimetype;
            newUserImage = existingUserImage;
        } else {
            newUserImage = new UserImage(image, mimetype, existingUser);
        }

        const [saveImageErr] = await to(this.userImageRepository.saveImage(newUserImage));
        if (saveImageErr) throw saveImageErr;
    }
}
