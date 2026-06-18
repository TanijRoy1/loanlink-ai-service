import { GoogleGenAI } from "@google/genai";
import { LoanSummaryInput, LoanSummaryOutput } from "../types/report.types";
import { buildLoanSummaryPrompt } from "../prompts/loanSummary.prompt";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
  apiKey,
});

export const generateLoanSummary = async (
  loanData: LoanSummaryInput,
): Promise<LoanSummaryOutput> => {
  const prompt = buildLoanSummaryPrompt(loanData);

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

    let parsedResponse: LoanSummaryOutput;

    try {
      parsedResponse = JSON.parse(rawText);
    } catch {
      throw new Error("Invalid Gemini response");
    }

    return parsedResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate loan summary");
  }
};
