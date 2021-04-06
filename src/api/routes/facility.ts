import { Router } from 'express';
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
        asyncHandler(
            () => {
                const facilityService = Container.get(FacilityService);
                return facilityService.getAllFacilities();
            },
            { converter: result => ({ facilities: result }) },
        ),
    );
};
