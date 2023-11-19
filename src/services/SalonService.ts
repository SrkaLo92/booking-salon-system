import { Service } from "typedi";
import SalonRepository from "../database/repositories/SalonRepository";
import { SalonCreateDTO, SalonLoad, SalonUpdateDTO } from "../interfaces/Salon";
import { to } from "../util/awaitTo";
import NotFoundError from '../util/errors/NotFoundError';
import { UserRole } from "@prisma/client";
import UnauthorizedError from "../util/errors/ValidationError";
import { UserLoad } from "../interfaces/User";
import ValidationError from "../util/errors/ValidationError";

@Service()
export default class SalonService {
  constructor(private salonRepository: SalonRepository) {}

  public async createSalon(salonDTO: SalonCreateDTO, user: UserLoad): Promise<void> {
    if (user.role !== UserRole.SALON_OWNER) {
      throw new UnauthorizedError('Only salon owners can create salons.');
    }

    const salonExists = await this.salonRepository.existsSalonByName(salonDTO.name);
    if (salonExists) {
      throw new ValidationError(`Salon with name ${salonDTO.name} already exists`);
    }

    const [createSalonErr] = await to(this.salonRepository.createSalon(salonDTO, user));
    if (createSalonErr) throw createSalonErr;
  }

  public async updateSalon(salonId: number, salonDTO: SalonUpdateDTO, user: UserLoad): Promise<void> {
    if (user.role !== UserRole.SALON_OWNER) {
      throw new UnauthorizedError('Only salon owners can create salons.');
    }

    const salonExists = await this.salonRepository.existsSalonByName(salonDTO.name);
    if (salonExists) {
      throw new ValidationError(`Salon with name ${salonDTO.name} already exists`);
    }

    const [updateSalonErr] = await to(this.salonRepository.updateSalon(salonId, salonDTO, user));
    if (updateSalonErr) throw updateSalonErr;
  }

  public async getSalonInfo(salonId: number): Promise<SalonLoad> {
    const [findSalonErr, salon] = await to(this.salonRepository.findSalonById(salonId));
    if (findSalonErr) throw findSalonErr;
    if (!salon) throw new NotFoundError(`Salon with id ${salonId} not found`);

    return salon;
  }


  public async deleteSalon(salonId: number, user: UserLoad): Promise<void> {
    const [findSalonErr, existingSalon] = await to(this.salonRepository.findSalonById(salonId));
    if (findSalonErr) throw findSalonErr;
    if (!existingSalon) throw new NotFoundError(`There is no salon with id ${salonId}`);

    const [deleteSalonErr] = await to(this.salonRepository.deleteSalon(existingSalon.id, user));
    if (deleteSalonErr) throw deleteSalonErr;
  }
}
