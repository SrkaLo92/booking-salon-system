import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/AuthService';
import { UserLoginDTO, UserRegisterDTO } from '../../interfaces/User';
import { celebrate, Joi } from 'celebrate';
import asyncHandler from '../../util/asyncHandler';
import middlewares from '../middlewares';

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
        asyncHandler(async (req: Request, res: Response) => {
            const authService = Container.get(AuthService);
            const { email, password } = req.body as UserLoginDTO;
            const token = await authService.SignIn(email, password);
            res.status(201).json({ token });
        }),
    );

    route.post(
        '/signout',
        middlewares.isAuth,
        asyncHandler(async (req: Request, res: Response) => {
            //@TODO AuthService.Logout(req.user) do some clever stuff
            res.status(200).end();
        }),
    );
};
