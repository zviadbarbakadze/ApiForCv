import { check, validationResult } from "express-validator";
import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../interfaces/express";

export const registrationValidation = [
  check("firstName").notEmpty().trim().isString().isLength({ max: 128 }),
  check("lastName").notEmpty().trim().isString().isLength({ max: 128 }),
  check("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }
    return true;
  }),
  check("title").notEmpty().trim().isString().isLength({ max: 256 }),
  check("summary").notEmpty().trim().isString().isLength({ max: 256 }),
  check("role").notEmpty().trim().isString().isLength({ max: 50 }),
  check("email").notEmpty().trim().isEmail(),
  check("password").notEmpty().isString().trim().isLength({ min: 6 }),
];

export const loginValidation = [
  check("email").notEmpty().trim().isEmail(),
  check("password").notEmpty().isString().trim().isLength({ min: 6 }),
];
export const experienceValidation = [
  check("userId").notEmpty().trim().isNumeric(),

  check("companyName").notEmpty().isString().trim().isLength({ max: 256 }),
  check("role").notEmpty().trim().isString().isLength({ max: 256 }),

  check("startDate").notEmpty().isDate().trim(),
  check("endDate").notEmpty().isDate().trim(),
  check("description").notEmpty().isString().trim(),
];
export const feedbackValidaion = [
  check("fromUser").notEmpty().isNumeric().trim(),
  check("companyName").notEmpty().isString().trim().isLength({ max: 128 }),
  check("toUser").notEmpty().isNumeric().trim(),
  check("content").notEmpty().isString().trim(),
];
export const projectsValidation = [
  check("userId").notEmpty().trim().isNumeric(),
  check("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }
    return true;
  }),
  check("description").notEmpty().trim().isString(),
];
export const handleValidationResults = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.logger.error(errors);
    return res.status(400).send("validation failed");
  }
  next();
};
