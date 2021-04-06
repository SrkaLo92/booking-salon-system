import { Router, Request } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/AuthService';
import { UserLoginDTO, UserRegisterDTO } from '../../interfaces/User';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import asyncHandler from '../../util/asyncHandler';

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
                confirmPassword: Joi.string().required(),
            }),
        }),
        asyncHandler(
            (req: Request) => {
                const authService = Container.get(AuthService);
                return authService.SignUp(req.body as UserRegisterDTO);
            },
            { status: 201 },
        ),
    );

    route.post(
        '/signin',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        asyncHandler(
            (req: Request) => {
                const authService = Container.get(AuthService);
                const { email, password } = req.body as UserLoginDTO;
                return authService.SignIn(email, password);
            },
            { converter: result => ({ token: result }) },
        ),
    );

    route.post(
        '/signout',
        middlewares.isAuth,
        asyncHandler((req: Request) => {
            //@TODO AuthService.Logout(req.user) do some clever stuff
            return req.body;
        }),
    );
};
