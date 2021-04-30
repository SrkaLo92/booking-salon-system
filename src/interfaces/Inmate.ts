import { InmateContact, InmateMailingAddress } from '.prisma/client';

type JustContactUpsert = Pick<
    InmateContact,
    'firstName' | 'lastName' | 'inmateId' | 'facilityName' | 'facilityState' | 'facilityCity' | 'facilityZipCode'
>;
type MailingAddressesUpsert = { mailingAddresses: Pick<InmateMailingAddress, 'mailingAddress' | 'order'>[] };
export type ContactUpsert = JustContactUpsert & MailingAddressesUpsert;

type JustContactSelect = Pick<
    InmateContact,
    'id' | 'firstName' | 'lastName' | 'inmateId' | 'facilityName' | 'facilityState' | 'facilityCity' | 'facilityZipCode'
>;
type MailingAddressesSelect = { mailingAddresses: Pick<InmateMailingAddress, 'mailingAddress'>[] };
export type ContactSelect = JustContactSelect & MailingAddressesSelect;

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
}
