/*
  Warnings:

  - You are about to drop the column `deleted` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `newClientsCount` to the `analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularServices` to the `analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `analytics` ADD COLUMN `newClientsCount` INTEGER NOT NULL,
    ADD COLUMN `popularServices` JSON NOT NULL;

-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `deleted`,
    ADD COLUMN `employeeId` INTEGER NULL,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `notes` VARCHAR(1000) NULL,
    ADD COLUMN `startTime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `promotion` ADD COLUMN `description` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `review` ADD COLUMN `visitDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salon` ADD COLUMN `latitude` FLOAT NULL,
    ADD COLUMN `longitude` FLOAT NULL,
    ADD COLUMN `openingHours` JSON NOT NULL;

-- AlterTable
ALTER TABLE `service` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `phoneNumber` VARCHAR(15) NULL,
    ADD COLUMN `salonId` INTEGER NULL,
    MODIFY `role` ENUM('USER', 'SALON_OWNER', 'EMPLOYEE', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
