/*
  Warnings:

  - Added the required column `userId` to the `Copy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Copy" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Copy_userId_idx" ON "Copy"("userId");

-- AddForeignKey
ALTER TABLE "Copy" ADD CONSTRAINT "Copy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
