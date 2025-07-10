/*
  Warnings:

  - You are about to drop the `UserRoom` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomName]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomName` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserRoom" DROP CONSTRAINT "UserRoom_userId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roomName" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserRoom";

-- CreateIndex
CREATE UNIQUE INDEX "Room_roomName_key" ON "Room"("roomName");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
