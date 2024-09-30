/*
  Warnings:

  - You are about to drop the column `followerId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_followerId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_followingId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "followerId",
DROP COLUMN "followingId";

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "folowerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_folowerId_fkey" FOREIGN KEY ("folowerId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
