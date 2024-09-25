/*
  Warnings:

  - Made the column `profileId` on table `thread` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "thread" DROP CONSTRAINT "thread_profileId_fkey";

-- AlterTable
ALTER TABLE "thread" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "profileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
