import { Request, Response, NextFunction } from "express";

type LoanRequestBody = {
  applicantName: string;
  monthlyIncome: number;
  loanAmount: number;
  duration: number;
  purpose: string;
};

export const validateLoanRequest = (
  req: Request<{}, {}, LoanRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const { applicantName, monthlyIncome, loanAmount, duration, purpose } =
    req.body;

  if (!applicantName) {
    return res.status(400).json({
      success: false,
      message: "applicantName is required",
    });
  }

  if (monthlyIncome <= 0) {
    return res.status(400).json({
      success: false,
      message: "monthlyIncome must be greater than 0",
    });
  }

  if (loanAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "loanAmount must be greater than 0",
    });
  }

  if (duration <= 0) {
    return res.status(400).json({
      success: false,
      message: "duration must be greater than 0",
    });
  }

  if (!purpose) {
    return res.status(400).json({
      success: false,
      message: "purpose is required",
    });
  }

  next();
};
