import { prisma } from "../config/db";
import { LoanSummaryInput, LoanSummaryOutput } from "../types/report.types";

export const saveReport = async (
  loanData: LoanSummaryInput,
  aiReport: LoanSummaryOutput,
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
    },
  });
};

export const findAllReports = async () => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Reports fetched:", reports.length);

    return reports;
  } catch (error) {
    console.error("PRISMA FIND REPORTS ERROR:", error);
    throw error;
  }
};

export const findReportById = (id: string) => {
  return prisma.report.findUnique({
    where: { id },
  });
};
