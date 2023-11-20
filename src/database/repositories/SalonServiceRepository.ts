import { Inject, Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { SalonServiceInsert } from "../../interfaces/SalonService";

@Service()
export default class SalonServiceRepository {
  constructor(@Inject("db") private prisma: PrismaClient) {}

  addServiceToSalon(salonServiceData: SalonServiceInsert): Promise<void> {
    return this.prisma.salonService.create({
      data: salonServiceData
    }).then();
  }
}
