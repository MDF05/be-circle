/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_folowerId_fkey";

-- DropTable
DROP TABLE "Follow";

-- CreateTable
CREATE TABLE "follow" (
    "id" TEXT NOT NULL,
    "folowerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_folowerId_fkey" FOREIGN KEY ("folowerId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
