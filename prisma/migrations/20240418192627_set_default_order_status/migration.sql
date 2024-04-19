/*
  Warnings:

  - Made the column `isHighlighted` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'en attente';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "isHighlighted" SET NOT NULL;
