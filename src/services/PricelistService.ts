import { Service } from 'typedi';
import { PricelistLoad } from '../interfaces/Pricelist';
import PricelistRepository from '../database/repositories/PricelistRepository';

@Service()
export default class PricelistService {
    constructor(private pricelistRepository: PricelistRepository) {}

    public async getActivePricelist(): Promise<PricelistLoad> {
        return this.pricelistRepository.findActivePricelist();
    }
}
