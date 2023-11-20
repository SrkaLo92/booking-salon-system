import { Router, Request } from 'express';
import { Container } from 'typedi';
import SalonService from '../../services/SalonService';
import { SalonCreateDTO, SalonUpdateDTO } from '../../interfaces/Salon';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import asyncHandler from '../../util/asyncHandler';
import { UserRole } from "@prisma/client";
import ServicesService from "../../services/ServicesService";
import { ServiceCreateDTO, ServiceUpdateDTO } from "../../interfaces/Service";

const route = Router();

export default (app: Router): void => {
  app.use('/service', route);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SUPER_ADMIN]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        duration: Joi.number().required(),
        categoryId: Joi.number().required()
      }),
    }),
    asyncHandler(
      (req: Request) => {
        const servicesService = Container.get(ServicesService);
        const user: any = req.user;
        return servicesService.createService(req.body as ServiceCreateDTO, user);
      },
      { status: 201 },
    ),
  );

  route.put(
    '/:serviceId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SUPER_ADMIN]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        duration: Joi.number().required(),
        categoryId: Joi.number().required()
      }),
    }),
    asyncHandler(
      (req: Request) => {
        const serviceId = parseInt(req.params.serviceId);
        const servicesService = Container.get(ServicesService);
        const user: any = req.user;
        return servicesService.updateService(serviceId, req.body as ServiceUpdateDTO, user);
      },
      { status: 200 },
    ),
  );

  route.get(
    '/:serviceId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER, UserRole.SUPER_ADMIN]),
    asyncHandler(
      (req: Request) => {
        const serviceId = parseInt(req.params.serviceId);
        const servicesService = Container.get(ServicesService);
        return servicesService.getServiceInfo(serviceId);
      },
      { status: 200 },
    ),
  );

  route.delete(
    '/:serviceId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER, UserRole.SUPER_ADMIN]),
    asyncHandler((req: Request) => {
      const serviceId = parseInt(req.params.serviceId);
      const servicesService = Container.get(ServicesService);
      const user: any = req.user;
      return servicesService.deleteService(serviceId, user);
    }),
  );

};
