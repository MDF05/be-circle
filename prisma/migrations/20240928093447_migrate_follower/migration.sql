-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "followId" TEXT,
ADD COLUMN     "followerId" TEXT;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_followId_fkey" FOREIGN KEY ("followId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
