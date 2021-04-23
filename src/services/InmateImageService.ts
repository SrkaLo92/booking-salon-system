import { Service } from 'typedi';
import { InmateContactImage } from '../database/entities/InmateContactImage';
import InmateImageRepository from '../database/repositories/InmateImageRepository';
import InmateRepository from '../database/repositories/InmateRepository';
import { to } from '../util/awaitTo';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class InmateImageService {
    constructor(private inmateImageRepository: InmateImageRepository, private inmateRepository: InmateRepository) {}

    public async getInmateContactImage(userID: number, contactId: number): Promise<InmateContactImage> {
        const [findContactImageErr, inmateImage] = await to(
            this.inmateImageRepository.findContactImageByContactIdAndUserId(contactId, userID),
        );
        if (findContactImageErr) throw findContactImageErr;
        if (!inmateImage) throw new NotFoundError(`There is no image for inmate contact with id ${contactId}`);

        return inmateImage;
    }

    public async uploadInmateContactImage(
        userID: number,
        contactId: number,
        contactImage: Buffer,
        mimetype: string,
    ): Promise<void> {
        const [findContactErr, existingInmateContact] = await to(
            this.inmateRepository.findContactByIdAndUserId(contactId, userID),
        );
        if (findContactErr) throw findContactErr;
        if (!existingInmateContact) throw new NotFoundError(`There is no inmate contact with id ${contactId}`);

        const [findContactImageErr, inmateImage] = await to(
            this.inmateImageRepository.findContactImageByContactIdAndUserId(contactId, userID),
        );
        if (findContactImageErr) throw findContactImageErr;

        let newInmateImage;

        if (inmateImage) {
            inmateImage.image = contactImage;
            inmateImage.mimetype = mimetype;
            newInmateImage = inmateImage;
        } else {
            newInmateImage = new InmateContactImage(contactImage, mimetype, existingInmateContact);
        }

        const [saveContactImageErr] = await to(this.inmateImageRepository.saveImage(newInmateImage));
        if (saveContactImageErr) throw saveContactImageErr;
    }
}
