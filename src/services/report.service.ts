import crypto from "crypto";
import { prisma } from "../config/db";
import { LoanSummaryInput, LoanSummaryOutput } from "../types/report.types";

export const saveReport = async (
  loanData: LoanSummaryInput,
  aiReport: LoanSummaryOutput,
) => {
  return prisma.report.create({
    data: {
      loanId: crypto.randomUUID(),
      userId: crypto.randomUUID(),

      summary: aiReport.summary,

      repaymentAnalysis: aiReport.repaymentAnalysis,

      riskAnalysis: aiReport.riskAnalysis,

      status: "completed",
    },
  });
};

export const findReportById = (id: string) => {
  return prisma.report.findUnique({
    where: { id },
  });
};
