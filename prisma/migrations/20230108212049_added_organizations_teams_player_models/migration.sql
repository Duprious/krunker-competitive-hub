-- AlterTable
ALTER TABLE `Tournaments` ADD COLUMN `organizationId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Organization` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` VARCHAR(191) NOT NULL,
    `teamName` VARCHAR(191) NOT NULL,
    `captain` VARCHAR(191) NOT NULL,
    `tournamentId` VARCHAR(191) NOT NULL,

    INDEX `Team_tournamentId_idx`(`tournamentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `discordName` VARCHAR(191) NOT NULL,
    `ign` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NULL,

    INDEX `Player_teamId_idx`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Tournaments_organizationId_idx` ON `Tournaments`(`organizationId`);
