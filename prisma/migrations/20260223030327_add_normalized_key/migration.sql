/*
  Warnings:

  - A unique constraint covering the columns `[normalizedKey]` on the table `Release` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedKey` to the `Release` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Copy" DROP CONSTRAINT "Copy_userId_fkey";

-- AlterTable
ALTER TABLE "Release" ADD COLUMN     "normalizedKey" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Copy_userId_releaseId_idx" ON "Copy"("userId", "releaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Release_normalizedKey_key" ON "Release"("normalizedKey");

-- AddForeignKey
ALTER TABLE "Copy" ADD CONSTRAINT "Copy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
