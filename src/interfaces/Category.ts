import { Category } from '.prisma/client';

export type CategoryInsert = Pick<Category, 'name'>;
export type CategoryUpdate = Partial<CategoryInsert>;
export type CategorySelect = Pick<Category, 'id' | 'name'>;

export interface CategoryCreateDTO {
  name: string;
}

export interface CategoryUpdateDTO {
  name?: string;
}

export interface CategoryLoad {
  id: number;
  name: string;
}
