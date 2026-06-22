export interface LoanSummaryInput {
  loanId: string;
  userId: string;
  applicantName: string;
  monthlyIncome: number;
  loanAmount: number;
  duration: number;
  purpose: string;
}

export interface LoanSummaryOutput {
  summary: string;
  repaymentAnalysis: string;
  riskAnalysis: string;
  recommendations: string[];
}

export interface PDFReportData {
  applicantName: string;
  loanAmount: number;
  duration: number;
  purpose: string;

  summary: string;
  repaymentAnalysis: string;
  riskAnalysis: string;

  recommendations: string[];
}
