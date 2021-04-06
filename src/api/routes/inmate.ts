import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '../../interfaces/Express';
import { InmateContactSave } from '../../interfaces/Inmate';
import InmateService from '../../services/InmateService';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
    app.use('/inmate', route);

    route.get(
        '',
        middlewares.isAuth,
        asyncHandler(async (req: RequestWithUser) => {
            const inmateService = Container.get(InmateService);
            return inmateService.getInmateContacts(req.user.id);
        }),
    );

    route.post(
        '',
        middlewares.isAuth,
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                inmateId: Joi.string().required(),
                facilityName: Joi.string().required(),
                facilityState: Joi.string().required(),
                facilityCity: Joi.string().required(),
                facilityZipCode: Joi.string().required(),
                mailingAddresses: Joi.array().min(1).max(2).required().items(Joi.string()),
            }),
        }),
        asyncHandler(
            (req: RequestWithUser) => {
                const inmateService = Container.get(InmateService);
                return inmateService.addInmateContact(req.user.id, req.body as InmateContactSave, null);
            },
            { status: 201 },
        ),
    );

    route.put(
        '/:contactId',
        middlewares.isAuth,
        celebrate({
            body: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                inmateId: Joi.string().required(),
                facilityName: Joi.string().required(),
                facilityState: Joi.string().required(),
                facilityCity: Joi.string().required(),
                facilityZipCode: Joi.string().required(),
                mailingAddresses: Joi.array().min(1).max(2).required().items(Joi.string()),
            }),
        }),
        asyncHandler((req: RequestWithUser) => {
            const inmateService = Container.get(InmateService);
            return inmateService.editInmateContact(
                req.user.id,
                Number(req.params.contactId),
                req.body as InmateContactSave,
                null,
            );
        }),
    );

    route.delete(
        '/:contactId',
        middlewares.isAuth,
        asyncHandler((req: RequestWithUser) => {
            const inmateService = Container.get(InmateService);
            return inmateService.deleteInmateContact(req.user.id, Number(req.params.contactId));
        }),
    );
};
