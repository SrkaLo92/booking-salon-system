import { Inject, Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { UserSalonInsert } from "../../interfaces/UserSalon";

@Service()
export default class UserSalonRepository {
  constructor(@Inject("db") private prisma: PrismaClient) {}

  createUserSalon(userSalonData: UserSalonInsert): Promise<void> {
    return this.prisma.userSalon.create({
      data: userSalonData
    }).then();
  }
}
