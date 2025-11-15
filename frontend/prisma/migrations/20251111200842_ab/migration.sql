/*
  Warnings:

  - You are about to drop the column `minesLocation` on the `bet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bet" DROP COLUMN "minesLocation",
ADD COLUMN     "gameData" JSONB;
