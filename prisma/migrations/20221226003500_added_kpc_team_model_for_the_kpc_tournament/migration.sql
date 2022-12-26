-- CreateTable
CREATE TABLE `KPCTeam` (
    `id` VARCHAR(191) NOT NULL,
    `teamName` VARCHAR(191) NOT NULL,
    `discordPlayerOne` VARCHAR(191) NOT NULL,
    `discordPlayerTwo` VARCHAR(191) NOT NULL,
    `ignPlayerOne` VARCHAR(191) NOT NULL,
    `ignPlayerTwo` VARCHAR(191) NOT NULL,
    `captain` VARCHAR(191) NOT NULL DEFAULT 'Player 1',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
