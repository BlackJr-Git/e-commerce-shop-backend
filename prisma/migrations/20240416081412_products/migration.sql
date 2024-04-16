/*
  Warnings:

  - You are about to drop the column `Groups` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Parent` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `UGS` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountEndDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discountStartDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `suggestedProducts` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - The `isVisible` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isHighlighted` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Groups",
DROP COLUMN "Parent",
DROP COLUMN "UGS",
DROP COLUMN "discountEndDate",
DROP COLUMN "discountStartDate",
DROP COLUMN "isAvailable",
DROP COLUMN "isPublished",
DROP COLUMN "suggestedProducts",
DROP COLUMN "tag",
DROP COLUMN "type",
DROP COLUMN "isVisible",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "isHighlighted",
ADD COLUMN     "isHighlighted" BOOLEAN DEFAULT false;
