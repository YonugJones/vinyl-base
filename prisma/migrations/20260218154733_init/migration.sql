-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('MINT', 'NEAR_MINT', 'VERY_GOOD_PLUS', 'VERY_GOOD', 'GOOD_PLUS', 'GOOD', 'FAIR', 'POOR');

-- CreateEnum
CREATE TYPE "Format" AS ENUM ('LP', 'EP', 'SINGLE', 'BOX_SET');

-- CreateEnum
CREATE TYPE "Rpm" AS ENUM ('RPM_33', 'RPM_45', 'RPM_78');

-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "label" TEXT,
    "coverArt" TEXT,
    "format" "Format",
    "rpm" "Rpm",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Copy" (
    "id" TEXT NOT NULL,
    "releaseId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3),
    "purchasePriceCents" INTEGER,
    "mediaCondition" "Condition",
    "sleeveCondition" "Condition",
    "notes" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "storageLocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Copy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Release_artist_idx" ON "Release"("artist");

-- CreateIndex
CREATE INDEX "Release_title_idx" ON "Release"("title");

-- CreateIndex
CREATE INDEX "Copy_releaseId_idx" ON "Copy"("releaseId");

-- CreateIndex
CREATE INDEX "Copy_isFavorite_idx" ON "Copy"("isFavorite");

-- CreateIndex
CREATE INDEX "Copy_purchaseDate_idx" ON "Copy"("purchaseDate");

-- AddForeignKey
ALTER TABLE "Copy" ADD CONSTRAINT "Copy_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
