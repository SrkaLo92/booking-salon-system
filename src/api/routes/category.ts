import { Router, Request } from 'express';
import { Container } from 'typedi';
import SalonService from '../../services/SalonService';
import { SalonCreateDTO, SalonUpdateDTO } from '../../interfaces/Salon';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import asyncHandler from '../../util/asyncHandler';
import { UserRole } from "@prisma/client";
import CategoryService from "../../services/CategoryService";
import { CategoryCreateDTO, CategoryUpdateDTO } from "../../interfaces/Category";

const route = Router();

export default (app: Router): void => {
  app.use('/category', route);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SUPER_ADMIN]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
      }),
    }),
    asyncHandler(
      (req: Request) => {
        const categoryService = Container.get(CategoryService);
        const user: any = req.user;
        return categoryService.createCategory(req.body as CategoryCreateDTO, user);
      },
      { status: 201 },
    ),
  );

  route.put(
    '/:categoryId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SUPER_ADMIN]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
      }),
    }),
    asyncHandler(
      (req: Request) => {
        const categoryId = parseInt(req.params.categoryId);
        const user: any = req.user;
        const categoryService = Container.get(CategoryService);
        return categoryService.updateCategory(categoryId, req.body as CategoryUpdateDTO, user);
      },
      { status: 200 },
    ),
  );

  route.get(
    '/:categoryId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER, UserRole.SUPER_ADMIN]),
    asyncHandler(
      (req: Request) => {
        const categoryId = parseInt(req.params.categoryId);
        const categoryService = Container.get(CategoryService);
        return categoryService.getCategoryInfo(categoryId);
      },
      { status: 200 },
    ),
  );

  route.delete(
    '/:categoryId',
    middlewares.isAuth,
    middlewares.roleCheck([UserRole.SALON_OWNER, UserRole.SUPER_ADMIN]),
    asyncHandler((req: Request) => {
      const categoryId = parseInt(req.params.categoryId);
      const categoryService = Container.get(CategoryService);
      const user: any = req.user;
      return categoryService.deleteCategory(categoryId, user);
    }),
  );

};
