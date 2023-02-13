/*
  Warnings:

  - You are about to drop the column `subforTeamId` on the `Player` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Player_subforTeamId_key` ON `Player`;

-- DropIndex
DROP INDEX `Team_teamName_key` ON `Team`;

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `subforTeamId`,
    MODIFY `teamId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_players` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_players_AB_unique`(`A`, `B`),
    INDEX `_players_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
