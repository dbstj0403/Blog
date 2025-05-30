/*
  Warnings:

  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `updated_at`,
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
