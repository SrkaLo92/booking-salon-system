import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import PricelistService from '../../services/PricelistService';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
    app.use('/pricelist', route);

    route.get(
        '/active',
        middlewares.isAuth,
        asyncHandler(async () => {
            const pricelistService = Container.get(PricelistService);
            return pricelistService.getActivePricelist();
        }),
    );
};
