export interface InmateContactSave {
    firstName: string;
    lastName: string;
    inmateId: string;
    facilityName: string;
    facilityState: string;
    facilityCity: string;
    facilityZipCode: string;
    mailingAddresses: string[];
}

export interface InmateContactLoad {
    id: number;
    firstName: string;
    lastName: string;
    inmateId: string;
    facilityName: string;
    facilityState: string;
    facilityCity: string;
    facilityZipCode: string;
    mailingAddresses: string[];
    user: { id: number };
}
