-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_salonId_fkey`;

-- AlterTable
ALTER TABLE `service` MODIFY `salonId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
