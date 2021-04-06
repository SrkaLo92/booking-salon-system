import { Service } from 'typedi';
import { Facility } from '../database/entities/Facility';
import FacilityRepository from '../database/repositories/FacilityRepository';
import { FacilityDTO } from '../interfaces/Facility';
import { to } from '../util/awaitTo';

@Service()
export default class FacilityService {
    constructor(private facilityRepository: FacilityRepository) {}

    public async getAllFacilities(): Promise<FacilityDTO[]> {
        const [findFacilitiesErr, facilities] = await to(this.facilityRepository.findAllFacilities());
        if (findFacilitiesErr) throw findFacilitiesErr;

        return facilities.map(this.convertToDTO);
    }

    public convertToDTO(facility: Facility): FacilityDTO {
        return {
            id: facility.id,
            facilityName: facility.facilityName,
            state: facility.state,
            city: facility.city,
            zipCode: facility.zipCode,
        };
    }
}
