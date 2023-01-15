-- AlterTable
ALTER TABLE `Team` ADD COLUMN `playerId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_players` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_players_AB_unique`(`A`, `B`),
    INDEX `_players_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Team_playerId_idx` ON `Team`(`playerId`);
