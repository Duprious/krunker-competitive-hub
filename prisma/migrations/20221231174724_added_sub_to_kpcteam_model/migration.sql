/*
  Warnings:

  - Added the required column `discordSub` to the `KPCTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ignSub` to the `KPCTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `KPCTeam` ADD COLUMN `discordSub` VARCHAR(191) NOT NULL,
    ADD COLUMN `ignSub` VARCHAR(191) NOT NULL;
