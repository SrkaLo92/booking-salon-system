import { Inject, Service } from "typedi";
import { PrismaClient, UserRole } from "@prisma/client";
import { SalonInsert, SalonSelect, SalonUpdate } from "../../interfaces/Salon";
import { UserLoad } from "../../interfaces/User";
import NotFoundError from "../../util/errors/NotFoundError";
import UnauthorizedError from "../../util/errors/ValidationError";

const selectedColumns = { id: true, name: true, description: true, address: true, createdAt: true, updatedAt: true };

@Service()
export default class SalonRepository {
  constructor(@Inject("db") private prisma: PrismaClient) {}

  createSalon(salon: SalonInsert, user: UserLoad): Promise<void> {
    return this.prisma.salon
      .create({
      select: null,
      data: {
        name: salon.name,
        description: salon.description,
        address: salon.address,
        latitude: salon.latitude,
        longitude: salon.longitude,
        openingHours: salon.openingHours,
        owner: {
          connect: {
            id: user.id
          }
        }
      }
    })
      .then();
  }

  updateSalon(salonId: number, salon: SalonUpdate, user: UserLoad): Promise<void> {
    return this.prisma.salon
      .findFirst({
        where: {
          id: salonId,
          ownerId: user.id
        }
      })
      .then((existingSalon) => {
        if (!existingSalon) throw new Error('You are not authorized to update this salon!');
        return this.prisma.salon
          .update({
            where: { id: salonId },
            data: salon
          });
      }).then();
  }

  findSalonById(salonId: number): Promise<SalonSelect> {
    return this.prisma.salon
      .findFirst({
      select: {
        ...selectedColumns,
        deleted: true,
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      },
      where: {id: salonId, deleted: false}
    })
      .then();
  }

  async existsSalonByName(name: string): Promise<boolean> {
    const count = await this.prisma.salon.count({
      where: {
        name,
      },
    });
    return count > 0;
  }


  async deleteSalon(salonId: number, user: UserLoad): Promise<void> {
    const salon = await this.prisma.salon.findUnique({
      where: { id: salonId },
    });

    if (!salon) {
      throw new NotFoundError('Salon not found');
    }

    if (salon.ownerId !== user.id && user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedError('You are not authorized to delete this salon');
    }

    return this.prisma.salon
      .update({
        select: null,
        where: { id: salonId },
        data: {
          deleted: true
        }
      })
      .then();
  }
}
