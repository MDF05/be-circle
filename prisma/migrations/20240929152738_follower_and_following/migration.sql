/*
  Warnings:

  - You are about to drop the column `folowerId` on the `follow` table. All the data in the column will be lost.
  - Added the required column `followerId` to the `follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_folowerId_fkey";

-- AlterTable
ALTER TABLE "follow" DROP COLUMN "folowerId",
ADD COLUMN     "followerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
