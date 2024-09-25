/*
  Warnings:

  - You are about to drop the column `userId` on the `thread` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "thread" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");
