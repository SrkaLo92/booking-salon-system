import { Inject, Service } from 'typedi';
import { Facility, PrismaClient } from '.prisma/client';

@Service()
export default class FacilityRepository {

    constructor(@Inject('db') private prisma: PrismaClient) {}

    findAllFacilities(): Promise<Facility[]> {
        return this.prisma.facility.findMany();
    }
}
