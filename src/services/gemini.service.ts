import { GoogleGenerativeAI } from "@google/generative-ai";
import { LoanSummaryInput } from "../types/report.types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateLoanSummary = async (): Promise<string> => {
  const loanData: LoanSummaryInput = {
    applicantName: "John Doe",
    monthlyIncome: 50000,
    loanAmount: 300000,
    duration: 24,
    purpose: "Business Expansion",
  };

  const prompt = `
                   Analyze the following loan application:
                   
                   ${JSON.stringify(loanData, null, 2)}
                   
                   Provide:
                   1. A brief summary
                   2. Repayment analysis
                   3. Risk analysis
                   4. Recommendations
                   `;

  try {
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate loan summary");
  }
};
