-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_threadId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "threadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
