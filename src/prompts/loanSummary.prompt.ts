import { LoanSummaryInput } from "../types/report.types";

export const buildLoanSummaryPrompt = (loanData: LoanSummaryInput): string => {
  return `
          Analyze the following loan application:
          
          ${JSON.stringify(loanData, null, 2)}
          
          Return ONLY valid JSON.
          
          Do not use markdown.
          Do not wrap with triple backticks.
          
          Use this exact format:
          
          {
            "summary":"",
            "repaymentAnalysis":"",
            "riskAnalysis":"",
            "recommendations":[]
          }
          `;
};
