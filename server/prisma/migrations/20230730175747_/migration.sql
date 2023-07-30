/*
  Warnings:

  - You are about to drop the `Purchases` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Purchases";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pricePaid" DECIMAL NOT NULL,
    "userId" TEXT NOT NULL,
    "investmentId" TEXT NOT NULL,
    "paymethodId" TEXT NOT NULL,
    CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Purchase_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_paymethodId_fkey" FOREIGN KEY ("paymethodId") REFERENCES "Paymethod" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
