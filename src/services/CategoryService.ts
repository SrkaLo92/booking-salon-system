import { Service } from "typedi";
import { to } from "../util/awaitTo";
import NotFoundError from '../util/errors/NotFoundError';
import { UserRole } from "@prisma/client";
import UnauthorizedError from "../util/errors/ValidationError";
import { UserLoad } from "../interfaces/User";
import ValidationError from "../util/errors/ValidationError";
import CategoryRepository from "../database/repositories/CategoryRepository";
import { CategoryCreateDTO, CategoryLoad, CategoryUpdateDTO } from "../interfaces/Category";

@Service()
export default class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  public async createCategory(categoryDTO: CategoryCreateDTO, user: UserLoad): Promise<void> {
    if (user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedError('Only super admin can create category.');
    }

    const categoryExists = await this.categoryRepository.existsCategoryByName(categoryDTO.name);
    if (categoryExists) {
      throw new ValidationError(`Category with name ${categoryDTO.name} already exists`);
    }

    const [createCategoryErr] = await to(this.categoryRepository.createCategory(categoryDTO));
    if (createCategoryErr) throw createCategoryErr;
  }

  public async updateCategory(categoryId: number, categoryDTO: CategoryUpdateDTO, user: UserLoad): Promise<void> {
    if (user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedError('Only super admin can update category.');
    }

    const categoryExists = await this.categoryRepository.existsCategoryByName(categoryDTO.name);
    if (categoryExists) {
      throw new ValidationError(`Category with name ${categoryDTO.name} already exists`);
    }

    const [updateCategoryErr] = await to(this.categoryRepository.updateCategory(categoryId, categoryDTO));
    if (updateCategoryErr) throw updateCategoryErr;
  }

  public async getCategoryInfo(categoryId: number): Promise<CategoryLoad> {
    const [findCategoryErr, category] = await to(this.categoryRepository.findCategoryById(categoryId));
    if (findCategoryErr) throw findCategoryErr;
    if (!category) throw new NotFoundError(`Category with id ${categoryId} not found`);

    return category;
  }


  public async deleteCategory(categoryId: number, user: UserLoad): Promise<void> {
    const [findCategoryErr, existingCategory] = await to(this.categoryRepository.findCategoryById(categoryId));
    if (findCategoryErr) throw findCategoryErr;
    if (!existingCategory) throw new NotFoundError(`There is no category with id ${categoryId}`);

    console.log(existingCategory);
    const [deleteCategoryErr] = await to(this.categoryRepository.deleteCategory(existingCategory.id));
    if (deleteCategoryErr) throw deleteCategoryErr;
  }
}
