import { Service } from "typedi";
import { to } from "../util/awaitTo";
import NotFoundError from '../util/errors/NotFoundError';
import { UserRole } from "@prisma/client";
import UnauthorizedError from "../util/errors/ValidationError";
import { UserLoad } from "../interfaces/User";
import ValidationError from "../util/errors/ValidationError";
import ServiceRepository from "../database/repositories/ServiceRepository";
import { ServiceCreateDTO, ServiceLoad, ServiceUpdateDTO } from "../interfaces/Service";

@Service()
export default class ServicesService {
  constructor(private serviceRepository: ServiceRepository) {}

  public async createService(serviceDTO: ServiceCreateDTO, user: UserLoad): Promise<void> {
    if (user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedError('Only salon owner can create service.');
    }

    const serviceExists = await this.serviceRepository.existsServiceByName(serviceDTO.name);
    if (serviceExists) {
      throw new ValidationError(`Service with name ${serviceDTO.name} already exists`);
    }

    const [createServiceErr] = await to(this.serviceRepository.createService(serviceDTO));
    if (createServiceErr) throw createServiceErr;
  }

  public async updateService(serviceId: number, serviceDTO: ServiceUpdateDTO, user: UserLoad): Promise<void> {
    if (user.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedError('Only super admin can create services.');
    }

    const serviceExists = await this.serviceRepository.existsServiceByName(serviceDTO.name);
    if (serviceExists) {
      throw new ValidationError(`Service with name ${serviceDTO.name} already exists`);
    }

    const [updateServiceErr] = await to(this.serviceRepository.updateService(serviceId, serviceDTO));
    if (updateServiceErr) throw updateServiceErr;
  }

  public async getServiceInfo(serviceId: number): Promise<ServiceLoad> {
    const [findServiceErr, service] = await to(this.serviceRepository.findServiceById(serviceId));
    if (findServiceErr) throw findServiceErr;
    if (!service) throw new NotFoundError(`Service with id ${serviceId} not found`);

    return service;
  }


  public async deleteService(serviceId: number, user: UserLoad): Promise<void> {
    const [findServiceErr, existingService] = await to(this.serviceRepository.findServiceById(serviceId));
    if (findServiceErr) throw findServiceErr;
    if (!existingService) throw new NotFoundError(`There is no service with id ${serviceId}`);

    const [deleteServiceErr] = await to(this.serviceRepository.deleteService(existingService.id));
    if (deleteServiceErr) throw deleteServiceErr;
  }
}
