/*
  Warnings:

  - You are about to drop the column `salonId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_salonId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `salonId`;

-- CreateTable
CREATE TABLE `UserSalon` (
    `userId` INTEGER NOT NULL,
    `salonId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `salonId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeSalon` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeSalon_AB_unique`(`A`, `B`),
    INDEX `_EmployeeSalon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSalon` ADD CONSTRAINT `UserSalon_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSalon` ADD CONSTRAINT `UserSalon_salonId_fkey` FOREIGN KEY (`salonId`) REFERENCES `salon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeSalon` ADD CONSTRAINT `_EmployeeSalon_A_fkey` FOREIGN KEY (`A`) REFERENCES `salon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeSalon` ADD CONSTRAINT `_EmployeeSalon_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
