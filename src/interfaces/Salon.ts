import { Salon } from '.prisma/client';

export type SalonInsert = Pick<Salon, 'name' | 'description' | 'address' | 'ownerId'>;
export type SalonUpdate = Partial<SalonInsert>;
export type SalonSelect = Pick<Salon, 'id' | 'name' | 'description' | 'address' | 'createdAt' | 'updatedAt'>;

export interface SalonCreateDTO {
  name: string;
  description: string;
  address: string;
  ownerId: number;
}

export interface SalonUpdateDTO {
  name?: string;
  description?: string;
  address?: string;
}

export interface SalonLoad {
  id: number;
  name: string;
  description?: string;
  address: string;
}

