-- AlterTable
ALTER TABLE `Tournaments` ADD COLUMN `ended` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `signupsClosed` BOOLEAN NOT NULL DEFAULT false;
