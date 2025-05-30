-- AlterTable
ALTER TABLE `users` ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;
