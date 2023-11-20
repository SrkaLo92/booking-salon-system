/*
  Warnings:

  - You are about to drop the column `salonId` on the `service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `service_salonId_fkey`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `salonId`;
