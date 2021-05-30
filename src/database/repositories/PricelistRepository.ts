import { Inject, Service } from 'typedi';
import { PrismaClient } from '.prisma/client';
import { PricelistSelect } from '../../interfaces/Pricelist';

@Service()
export default class PricelistRepository {
    constructor(@Inject('db') private prisma: PrismaClient) {}

    findActivePricelist(): Promise<PricelistSelect> {
        const now = new Date();
        return this.prisma.pricelist.findFirst({
            where: {
                AND: [
                    { OR: [{ startDate: { lte: now } }, { startDate: null }] },
                    { OR: [{ endDate: { gte: now } }, { endDate: null }] },
                ],
            },
            include: {
                servicePrices: {
                    select: {
                        id: true,
                        price: true,
                        fromQuantity: true,
                        toQuantity: true,
                        serviceType: true,
                        description: true,
                    },
                },
                shippingPrices: {
                    select: {
                        price: true,
                        shipping: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
