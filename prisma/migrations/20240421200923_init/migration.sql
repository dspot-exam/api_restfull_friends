/*
  Warnings:

  - You are about to drop the column `profileId` on the `Friend` table. All the data in the column will be lost.
  - Added the required column `profileId1` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId2` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Friend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId1" INTEGER NOT NULL,
    "profileId2" INTEGER NOT NULL,
    CONSTRAINT "Friend_profileId1_fkey" FOREIGN KEY ("profileId1") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friend_profileId2_fkey" FOREIGN KEY ("profileId2") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Friend" ("id") SELECT "id" FROM "Friend";
DROP TABLE "Friend";
ALTER TABLE "new_Friend" RENAME TO "Friend";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
