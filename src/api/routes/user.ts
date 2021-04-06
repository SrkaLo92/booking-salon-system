import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import { JwtToken, RequestWithUser } from '../../interfaces/Express';
import { UserSave } from '../../interfaces/User';
import AuthService from '../../services/AuthService';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router): void => {
    app.use('/me', route);

    route.get(
        '',
        middlewares.isAuth,
        asyncHandler(async (req: RequestWithUser) => {
            const authService = Container.get(AuthService);
            return authService.getUserInfo(req.user as JwtToken);
        }),
    );

    route.put(
        '',
        middlewares.isAuth,
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().optional(),
            }),
        }),
        asyncHandler(
            (req: RequestWithUser) => {
                const authService = Container.get(AuthService);
                return authService.editUser(req.user.id, req.body as UserSave, null);
            },
            { converter: result => ({ token: result }) },
        ),
    );

    route.delete(
        '',
        middlewares.isAuth,
        asyncHandler((req: RequestWithUser) => {
            const authService = Container.get(AuthService);
            return authService.deleteUser(req.user.id);
        }),
    );
};
