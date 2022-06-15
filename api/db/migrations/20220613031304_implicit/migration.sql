/*
  Warnings:

  - You are about to drop the `HeroOnQuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HeroOnQuest" DROP CONSTRAINT "HeroOnQuest_heroId_fkey";

-- DropForeignKey
ALTER TABLE "HeroOnQuest" DROP CONSTRAINT "HeroOnQuest_questId_fkey";

-- DropTable
DROP TABLE "HeroOnQuest";

-- CreateTable
CREATE TABLE "_HeroToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HeroToQuest_AB_unique" ON "_HeroToQuest"("A", "B");

-- CreateIndex
CREATE INDEX "_HeroToQuest_B_index" ON "_HeroToQuest"("B");

-- AddForeignKey
ALTER TABLE "_HeroToQuest" ADD CONSTRAINT "_HeroToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HeroToQuest" ADD CONSTRAINT "_HeroToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
