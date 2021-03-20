import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import FacilityService from '../../services/FacilityService';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
    app.use('/facilities', route);

    route.get(
        '',
        middlewares.isAuth,
        asyncHandler(async (req: Request, res: Response) => {
            const facilityService = Container.get(FacilityService);
            const facilities = await facilityService.getAllFacilities();
            res.status(200).json({ facilities });
        }),
    );
};
