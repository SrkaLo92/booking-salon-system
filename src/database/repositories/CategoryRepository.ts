import { Inject, Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { CategoryInsert, CategorySelect, CategoryUpdate } from "../../interfaces/Category";
import NotFoundError from "../../util/errors/NotFoundError";

@Service()
export default class CategoryRepository {
  constructor(@Inject("db") private prisma: PrismaClient) {}

  createCategory(category: CategoryInsert): Promise<void> {
    return this.prisma.category
      .create({
      data: category
    })
      .then();
  }

  updateCategory(categoryId: number, category: CategoryUpdate): Promise<void> {
    return this.prisma.category
      .update({
        where: {id: categoryId},
        data: category
      })
      .then();
  }

  findCategoryById(categoryId: number): Promise<CategorySelect> {
    return this.prisma.category
      .findUnique({
        select: {
          id: true,
          name: true,
          services: {
            select: {
              name: true
            }
          }
        },
        where: {id: categoryId, deleted: false}
      })
      .then();
  }

  async existsCategoryByName(name: string): Promise<boolean> {
    const count = await this.prisma.category.count({
      where: {
        name,
      },
    });
    return count > 0;
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return this.prisma.category
      .update({
        select: null,
        where: { id: categoryId },
        data: {
          deleted: true
        }
      })
      .then();
  }
}
