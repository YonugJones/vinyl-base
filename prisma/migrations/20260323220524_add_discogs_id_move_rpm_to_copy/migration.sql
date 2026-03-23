/*
  Warnings:

  - You are about to drop the column `rpm` on the `Release` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[discogsId]` on the table `Release` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Copy" ADD COLUMN     "rpm" "Rpm";

-- AlterTable
ALTER TABLE "Release" DROP COLUMN "rpm",
ADD COLUMN     "discogsId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Release_discogsId_key" ON "Release"("discogsId");
