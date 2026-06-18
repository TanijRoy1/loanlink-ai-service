/*
  Warnings:

  - Made the column `loanId` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "loanId" SET NOT NULL;
