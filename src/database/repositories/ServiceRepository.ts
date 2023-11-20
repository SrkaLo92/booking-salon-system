import { Inject, Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { ServiceInsert, ServiceSelect, ServiceUpdate } from "../../interfaces/Service";
import NotFoundError from "../../util/errors/NotFoundError";

@Service()
export default class ServiceRepository {
  constructor(@Inject("db") private prisma: PrismaClient) {}

  createService(service: ServiceInsert): Promise<void> {
    return this.prisma.service
      .create({
        data: service
      })
      .then();
  }

  updateService(serviceId: number, service: ServiceUpdate): Promise<void> {
    return this.prisma.service
      .update({
        where: {id: serviceId},
        data: service
      })
      .then();
  }

  findServiceById(serviceId: number): Promise<ServiceSelect> {
    return this.prisma.service
      .findUnique({
        where: {id: serviceId},
        select: {
          id: true,
          name: true,
          price: true,
          duration: true,
          createdAt: true,
          updatedAt: true,
          category: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
      .then();
  }

  async existsServiceByName(name: string): Promise<boolean> {
    const count = await this.prisma.service.count({
      where: {
        name,
      },
    });
    return count > 0;
  }

  async deleteService(serviceId: number): Promise<void> {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    return this.prisma.service
      .update({
        select: null,
        where: { id: serviceId },
        data: {
          deleted: true
        }
      })
      .then();
  }
}
