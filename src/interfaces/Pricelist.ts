import { Pricelist, PriceService, PriceShipping, Shipping } from '.prisma/client';

export type ShippingSelect = Shipping;
export type PriceShippingSelect = Pick<PriceShipping, 'price'>; //& { shipping: Shipping };
export type PriceServiceSelect = Pick<
    PriceService,
    'id' | 'price' | 'fromQuantity' | 'toQuantity' | 'description' | 'serviceType'
>;

export type PricelistSelect = Pricelist & {
    servicePrices: PriceServiceSelect[];
    shippingPrices: PriceShippingSelect[];
};

export type PricelistLoad = PricelistSelect;
