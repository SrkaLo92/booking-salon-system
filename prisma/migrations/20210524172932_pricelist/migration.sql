-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('IMAGE', 'MESSAGE');

-- CreateTable
CREATE TABLE "price_list" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(1000),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_service" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "from_quantity" INTEGER NOT NULL,
    "to_quantity" INTEGER,
    "service_type" "ServiceType" NOT NULL,
    "description" VARCHAR(1000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price_list_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_shipping" (
    "price" DECIMAL(10,2) NOT NULL,
    "shipping_id" INTEGER NOT NULL,
    "price_list_id" INTEGER NOT NULL,

    PRIMARY KEY ("price_list_id","shipping_id")
);

-- AddForeignKey
ALTER TABLE "price_service" ADD FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_shipping" ADD FOREIGN KEY ("shipping_id") REFERENCES "shipping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_shipping" ADD FOREIGN KEY ("price_list_id") REFERENCES "price_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
