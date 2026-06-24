import { Request, Response } from "express";
import { generateLoanSummary } from "../services/gemini.service";
import { LoanSummaryInput } from "../types/report.types";
import { saveReport } from "../services/report.service";
import { findReportById, findAllReports } from "../services/report.service";
import { prisma } from "../config/db";
import PDFDocument from "pdfkit";
import { streamPDF } from "../services/pdf.service";
import { generateAndAttachPDF } from "../services/pdfReport.service";

// testAI
export const testAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await generateLoanSummary({
      loanId: "loan123",
      userId: "user456",
      applicantName: "John Doe",
      monthlyIncome: 50000,
      loanAmount: 300000,
      duration: 24,
      purpose: "Business Expansion",
    });

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};

// createReport
export const createReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const loanData: LoanSummaryInput = req.body;

    const report = await generateLoanSummary(loanData);

    const savedReport = await saveReport(loanData, report);

    const updatedReport = await generateAndAttachPDF(
      loanData,
      report,
      savedReport.id,
    );

    res.status(201).json({
      success: true,
      data: updatedReport,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate report",
    });
  }
};

// get all reports
export const getReports = async (req: Request, res: Response) => {
  // console.log("getReports controller called");
  try {
    const reports = await findAllReports();

    return res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

// getReport by id
interface ReportParams {
  id: string;
}
export const getReport = async (req: Request<ReportParams>, res: Response) => {
  try {
    const { id } = req.params;

    const report = await findReportById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
    });
  }
};

// download Report PDF
export const downloadReport = async (
  req: Request<ReportParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=loan-report-${id}.pdf`,
    );

    doc.pipe(res);

    streamPDF(doc, {
      applicantName: "Not Available",
      loanAmount: 0,
      duration: 0,
      purpose: "Not Available",

      summary: report.summary || "",

      repaymentAnalysis: report.repaymentAnalysis || "",

      riskAnalysis: report.riskAnalysis || "",

      recommendations: [],
    });

    doc.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to download PDF",
    });
  }
};
