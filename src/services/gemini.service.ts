import {
  LoanSummaryInput,
  LoanSummaryOutput,
} from "../types/report.types";

export const generateLoanSummary = async (
  data: LoanSummaryInput
): Promise<LoanSummaryOutput> => {
  return {
    summary: "",
    repaymentAnalysis: "",
    riskAnalysis: "",
    recommendations: [],
  };
};