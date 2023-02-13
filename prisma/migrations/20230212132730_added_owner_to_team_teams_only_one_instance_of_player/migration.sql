/*
  Warnings:

  - You are about to drop the `_players` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[subforTeamId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamName]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Made the column `teamId` on table `Player` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `subforTeamId` VARCHAR(191) NULL,
    MODIFY `teamId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Team` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_players`;

-- CreateIndex
CREATE UNIQUE INDEX `Player_subforTeamId_key` ON `Player`(`subforTeamId`);

-- CreateIndex
CREATE UNIQUE INDEX `Team_teamName_key` ON `Team`(`teamName`);

-- CreateIndex
CREATE INDEX `Team_userId_idx` ON `Team`(`userId`);
