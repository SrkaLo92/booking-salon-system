import { Router } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '../../interfaces/Express';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';
import multer from 'multer';
import { to } from '../../util/awaitTo';
import InmateImageService from '../../services/InmateImageService';
import { celebrate, Joi } from 'celebrate';
import UserImageService from '../../services/UserImageService';

const fileFilter = (req, file, cb) =>
    file.mimetype.startsWith('image') ? cb(null, true) : cb(new Error('Not an image! Please upload an image.'), false);

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
});

const route = Router();

export default (app: Router): void => {
    app.use('', route);

    route.get(
        '/inmate/:contactId/image',
        middlewares.isAuth,
        celebrate({
            params: Joi.object({
                contactId: Joi.number().required(),
            }),
        }),
        async (req: RequestWithUser, res, next) => {
            const inmateImageService = Container.get(InmateImageService);
            const [contactImageErr, contactImage] = await to(
                inmateImageService.getInmateContactImage(req.user.id, Number(req.params.contactId)),
            );
            if (contactImageErr) return next(contactImageErr);
            res.setHeader('Content-Type', contactImage.mimetype);
            res.send(contactImage.image);
        },
    );

    route.put(
        '/inmate/:contactId/image',
        middlewares.isAuth,
        celebrate({
            params: Joi.object({
                contactId: Joi.number().required(),
            }),
        }),
        upload.single('image'),
        asyncHandler((req: RequestWithUser) => {
            const inmateImageService = Container.get(InmateImageService);
            return inmateImageService.uploadInmateContactImage(
                req.user.id,
                Number(req.params.contactId),
                req.file.buffer,
                req.file.mimetype,
            );
        }),
    );

    route.get('/me/image', middlewares.isAuth, async (req: RequestWithUser, res, next) => {
        const userImageService = Container.get(UserImageService);
        const [imageErr, userImage] = await to(userImageService.getUserImage(req.user.id));
        if (imageErr) return next(imageErr);
        res.setHeader('Content-Type', userImage.mimetype);
        res.send(userImage.image);
    });

    route.put(
        '/me/image',
        middlewares.isAuth,
        upload.single('image'),
        asyncHandler((req: RequestWithUser) => {
            const userImageService = Container.get(UserImageService);
            return userImageService.uploadUserImage(req.user.id, req.file.buffer, req.file.mimetype);
        }),
    );
};
