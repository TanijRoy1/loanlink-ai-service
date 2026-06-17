export interface LoanSummaryInput {
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