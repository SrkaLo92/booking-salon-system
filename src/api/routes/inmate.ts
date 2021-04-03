import { celebrate, Joi } from 'celebrate';
import { Router, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '../../interfaces/Express';
import { InmateContactAdd } from '../../interfaces/Inmate';
import InmateService from '../../services/InmateService';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
    app.use('/inmate', route);

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
        asyncHandler(async (req: RequestWithUser, res: Response) => {
            const inmateService = Container.get(InmateService);
            const inmate = await inmateService.addInmateContact(req.user.id, req.body as InmateContactAdd, null);
            res.status(201).json(inmate);
        }),
    );
};
