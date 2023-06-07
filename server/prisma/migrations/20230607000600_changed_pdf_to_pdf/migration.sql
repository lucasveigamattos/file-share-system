/*
  Warnings:

  - You are about to drop the `PDF` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PDF";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pdf" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL
);
