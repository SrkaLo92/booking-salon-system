-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `salon` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
