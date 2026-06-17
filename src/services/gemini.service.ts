import { GoogleGenAI } from "@google/genai";
import { LoanSummaryInput, LoanSummaryOutput } from "../types/report.types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
  apiKey,
});

export const generateLoanSummary = async (): Promise<LoanSummaryOutput> => {
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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    const rawText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResponse: LoanSummaryOutput = JSON.parse(rawText);

    return parsedResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate loan summary");
  }
};
