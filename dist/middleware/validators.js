"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationResults = exports.projectsValidation = exports.feedbackValidaion = exports.experienceValidation = exports.loginValidation = exports.registrationValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registrationValidation = [
    (0, express_validator_1.check)("firstName").notEmpty().trim().isString().isLength({ max: 128 }),
    (0, express_validator_1.check)("lastName").notEmpty().trim().isString().isLength({ max: 128 }),
    (0, express_validator_1.check)("image").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image is required");
        }
        return true;
    }),
    (0, express_validator_1.check)("title").notEmpty().trim().isString().isLength({ max: 256 }),
    (0, express_validator_1.check)("summary").notEmpty().trim().isString().isLength({ max: 256 }),
    (0, express_validator_1.check)("role").notEmpty().trim().isString().isLength({ max: 50 }),
    (0, express_validator_1.check)("email").notEmpty().trim().isEmail(),
    (0, express_validator_1.check)("password").notEmpty().isString().trim().isLength({ min: 6 }),
];
exports.loginValidation = [
    (0, express_validator_1.check)("email").notEmpty().trim().isEmail(),
    (0, express_validator_1.check)("password").notEmpty().isString().trim().isLength({ min: 6 }),
];
exports.experienceValidation = [
    (0, express_validator_1.check)("userId").notEmpty().trim().isNumeric(),
    (0, express_validator_1.check)("companyName").notEmpty().isString().trim().isLength({ max: 256 }),
    (0, express_validator_1.check)("role").notEmpty().trim().isString().isLength({ max: 256 }),
    (0, express_validator_1.check)("startDate").notEmpty().isDate().trim(),
    (0, express_validator_1.check)("endDate").notEmpty().isDate().trim(),
    (0, express_validator_1.check)("description").notEmpty().isString().trim(),
];
exports.feedbackValidaion = [
    (0, express_validator_1.check)("fromUser").notEmpty().isNumeric().trim(),
    (0, express_validator_1.check)("companyName").notEmpty().isString().trim().isLength({ max: 128 }),
    (0, express_validator_1.check)("toUser").notEmpty().isNumeric().trim(),
    (0, express_validator_1.check)("content").notEmpty().isString().trim(),
];
exports.projectsValidation = [
    (0, express_validator_1.check)("userId").notEmpty().trim().isNumeric(),
    (0, express_validator_1.check)("image").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image is required");
        }
        return true;
    }),
    (0, express_validator_1.check)("description").notEmpty().trim().isString(),
];
const handleValidationResults = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        req.logger.error(errors);
        return res.status(400).send("validation failed");
    }
    next();
};
exports.handleValidationResults = handleValidationResults;
//# sourceMappingURL=validators.js.map