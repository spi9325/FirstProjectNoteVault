/*
  Warnings:

  - You are about to drop the column `name` on the `Room` table. All the data in the column will be lost.
  - Added the required column `creator` to the `UserRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "UserRoom" ADD COLUMN     "creator" TEXT NOT NULL;
