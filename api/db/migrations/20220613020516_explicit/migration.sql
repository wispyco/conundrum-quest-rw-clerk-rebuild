/*
  Warnings:

  - You are about to drop the `_HeroToQuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HeroToQuest" DROP CONSTRAINT "_HeroToQuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_HeroToQuest" DROP CONSTRAINT "_HeroToQuest_B_fkey";

-- DropTable
DROP TABLE "_HeroToQuest";

-- CreateTable
CREATE TABLE "HeroOnQuest" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "HeroOnQuest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HeroOnQuest" ADD CONSTRAINT "HeroOnQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroOnQuest" ADD CONSTRAINT "HeroOnQuest_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
