/*
  Warnings:

  - You are about to drop the column `fullName` on the `user` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "fullName";
