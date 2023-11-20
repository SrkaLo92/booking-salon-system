import { SalonService as PrismaSalonService } from '.prisma/client';

export type SalonServiceInsert = Pick<PrismaSalonService, 'salonId' | 'serviceId'>;

export interface SalonServiceCreateDTO {
  salonId: number;
  serviceId: number;
}

export interface SalonServiceLoad {
  salonId: number;
  serviceId: number;
}
