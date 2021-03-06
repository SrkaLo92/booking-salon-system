import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/AuthService';
import { UserRegisterDTO } from '../../interfaces/User';
import { celebrate, Joi } from 'celebrate';
import asyncHandler from '../../util/async-handler';
import passport from 'passport';

const route = Router();

export default (app: Router): void => {
    app.use('/auth', route);

    route.post(
        '/signup',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                password: Joi.string().required(),
                confirm_password: Joi.string().required(),
            }),
        }),
        asyncHandler(async (req: Request, res: Response) => {
            const authService = Container.get(AuthService);
            const user = await authService.SignUp(req.body as UserRegisterDTO);
            res.status(201).json(user);
        }),
    );

    route.post(
        '/signin',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        passport.authenticate('local', { session: false }),
        asyncHandler(async (req: Request, res: Response) => {
            const authService = Container.get(AuthService);
            const data = await authService.SignIn();
            res.status(201).json(data);
        }),
    );
};
