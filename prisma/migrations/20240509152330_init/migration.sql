/*
  Warnings:

  - You are about to drop the column `date` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Note` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked" BOOLEAN NOT NULL
);
INSERT INTO "new_Note" ("checked", "content", "created_at", "id", "title") SELECT "checked", "content", "created_at", "id", "title" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;