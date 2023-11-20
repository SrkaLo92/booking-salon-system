import { UserSalon as PrismaUserSalon } from '.prisma/client';

export type UserSalonInsert = Pick<PrismaUserSalon, 'userId' | 'salonId'>;
export interface UserSalonCreateDTO {
  userId: number;
  salonId: number;
}

export interface UserSalonLoad {
  userId: number;
  salonId: number;
}

