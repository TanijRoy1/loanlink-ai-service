import { prisma } from "../config/db";
import { generatePDF } from "./pdf.service";
import { LoanSummaryInput, LoanSummaryOutput } from "../types/report.types";

export const generateAndAttachPDF = async (
  loanData: LoanSummaryInput,
  report: LoanSummaryOutput,
  reportId: string,
) => {
  const pdfData = {
    applicantName: loanData.applicantName,
    loanAmount: loanData.loanAmount,
    duration: loanData.duration,
    purpose: loanData.purpose,

    summary: report.summary,
    repaymentAnalysis: report.repaymentAnalysis,
    riskAnalysis: report.riskAnalysis,

    recommendations: report.recommendations,
  };

  const filePath = await generatePDF(pdfData, reportId);

  const updatedReport = await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      pdfPath: filePath,
    },
  });

  return updatedReport;
};
