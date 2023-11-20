import { Service } from '.prisma/client';

export type ServiceInsert = Pick<Service, 'name' | 'price' | 'duration' | 'categoryId'>;
export type ServiceUpdate = Partial<ServiceInsert>;
export type ServiceSelect = Pick<Service, 'id' | 'name' | 'price' | 'duration' | 'categoryId' | 'createdAt' | 'updatedAt'>;

export interface ServiceCreateDTO {
  name: string;
  price: number;
  duration: number; // Duration in minutes
  categoryId: number;
}

export interface ServiceUpdateDTO {
  name?: string;
  price?: number;
  duration?: number;
  categoryId?: number;
}

export interface ServiceLoad {
  id: number;
  name: string;
  price: number;
  duration: number;
  categoryId: number;
}
