import crypto from "crypto";
import { prisma } from "../config/db";
import { LoanSummaryInput, LoanSummaryOutput } from "../types/report.types";

export const saveReport = async (
  loanData: LoanSummaryInput,
  aiReport: LoanSummaryOutput,
  pdfPath?: string,
) => {
  return prisma.report.create({
    data: {
      loanId: loanData.loanId,
      userId: loanData.userId,

      applicantName: loanData.applicantName,
      monthlyIncome: loanData.monthlyIncome,
      loanAmount: loanData.loanAmount,
      duration: loanData.duration,
      purpose: loanData.purpose,

      summary: aiReport.summary,
      repaymentAnalysis: aiReport.repaymentAnalysis,
      riskAnalysis: aiReport.riskAnalysis,

      recommendations: aiReport.recommendations,

      status: "completed",
      pdfPath: pdfPath || null,
    },
  });
};

export const findAllReports = () => {
  return prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findReportById = (id: string) => {
  return prisma.report.findUnique({
    where: { id },
  });
};
