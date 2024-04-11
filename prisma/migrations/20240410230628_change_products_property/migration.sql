/*
  Warnings:

  - The `isPublished` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isHighlighted` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isAvailable` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isPublished",
ADD COLUMN     "isPublished" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "isHighlighted",
ADD COLUMN     "isHighlighted" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "isAvailable",
ADD COLUMN     "isAvailable" INTEGER NOT NULL DEFAULT 1;
