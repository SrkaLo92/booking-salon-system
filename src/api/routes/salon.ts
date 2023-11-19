import { Router, Request } from 'express';
import { Container } from 'typedi';
import SalonService from '../../services/SalonService';
import { SalonCreateDTO, SalonUpdateDTO } from '../../interfaces/Salon';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import asyncHandler from '../../util/asyncHandler';
import { UserRole } from "@prisma/client";
import { RequestWithUser } from "../../interfaces/Express";
import AuthService from "../../services/AuthService";

const route = Router();

export default (app: Router): void => {
  app.use('/salon', route);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow(''),
        address: Joi.string().required(),
      }),
    }),
    asyncHandler(
      (req: Request) => {
        const salonService = Container.get(SalonService);
        const user: any = req.user;
        return salonService.createSalon(req.body as SalonCreateDTO, user);
      },
      { status: 201 },
    ),
  );

  route.put(
    '/:salonId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow(''),
        address: Joi.string().required(),
      }),
    }),
    asyncHandler(
      (req: Request) => {
        const salonId = parseInt(req.params.salonId);
        const user: any = req.user;
        const salonService = Container.get(SalonService);
        return salonService.updateSalon(salonId, req.body as SalonUpdateDTO, user);
      },
      { status: 200 },
    ),
  );

  route.get(
    '/:salonId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER, UserRole.SUPER_ADMIN]),
    asyncHandler(
      (req: Request) => {
        const salonId = parseInt(req.params.salonId);
        const salonService = Container.get(SalonService);
        return salonService.getSalonInfo(salonId);
      },
      { status: 200 },
    ),
  );

  route.delete(
    '/:salonId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER, UserRole.SUPER_ADMIN]),
    asyncHandler((req: Request) => {
      const salonId = parseInt(req.params.salonId);
      const salonService = Container.get(SalonService);
      const user: any = req.user;
      return salonService.deleteSalon(salonId, user);
    }),
  );

};
