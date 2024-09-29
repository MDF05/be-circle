/*
  Warnings:

  - You are about to drop the column `followId` on the `profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_followId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "followId",
ADD COLUMN     "followingId" TEXT;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
