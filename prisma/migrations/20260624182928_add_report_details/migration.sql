-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "applicantName" TEXT,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "loanAmount" DOUBLE PRECISION,
ADD COLUMN     "monthlyIncome" DOUBLE PRECISION,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "recommendations" JSONB;
