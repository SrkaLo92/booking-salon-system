import { Service } from 'typedi';
import InmateImageRepository from '../database/repositories/InmateImageRepository';
import InmateRepository from '../database/repositories/InmateRepository';
import { InmateImage } from '../interfaces/Image';
import { to } from '../util/awaitTo';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class InmateImageService {
    constructor(private inmateImageRepository: InmateImageRepository, private inmateRepository: InmateRepository) {}

    public async getInmateContactImage(userID: number, contactId: number): Promise<InmateImage> {
        const [findContactImageErr, inmateImage] = await to(
            this.inmateImageRepository.findContactImageByContactIdAndUserId(contactId, userID),
        );
        if (findContactImageErr) throw findContactImageErr;
        if (!inmateImage) throw new NotFoundError(`There is no image for inmate contact with id ${contactId}`);

        return inmateImage;
    }

    public async uploadInmateContactImage(
        userId: number,
        contactId: number,
        contactImage: Buffer,
        mimetype: string,
    ): Promise<void> {
        const [findContactErr, inmateContactExists] = await to(
            this.inmateRepository.existsContactByIdAndUserId(contactId, userId),
        );
        if (findContactErr) throw findContactErr;
        if (!inmateContactExists) throw new NotFoundError(`There is no inmate contact with id ${contactId}`);

        const [saveContactImageErr] = await to(this.inmateImageRepository.saveImage(contactId, contactImage, mimetype));
        if (saveContactImageErr) throw saveContactImageErr;
    }
}
