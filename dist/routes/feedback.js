"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFeedbackRouter = void 0;
const express_1 = __importDefault(require("express"));
const createFeedback_1 = require("./controllers/feedback/createFeedback");
const passport_1 = __importDefault(require("passport"));
const roles_1 = require("../middleware/roles");
const user_model_1 = require("../models/user.model");
const validators_1 = require("../middleware/validators");
const getFeedbacksByAdmin_1 = require("./controllers/feedback/getFeedbacksByAdmin");
const getFeedbackById_1 = require("./controllers/feedback/getFeedbackById");
const updateFeedback_1 = require("./controllers/feedback/updateFeedback");
const deleteFeedback_1 = require("./controllers/feedback/deleteFeedback");
const express_validator_1 = require("express-validator");
const makeFeedbackRouter = (context) => {
    const router = express_1.default.Router();
    router.post("/", passport_1.default.authenticate("jwt", { session: false }), validators_1.feedbackValidaion, validators_1.handleValidationResults, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () { return (0, createFeedback_1.createFeedback)(request, response, next, context); }));
    router.get("/", (0, express_validator_1.check)("pageSize").isInt().toInt().escape().withMessage("validation failed"), (0, express_validator_1.check)("page").isInt().toInt().escape().withMessage("validation failed"), passport_1.default.authenticate("jwt", { session: false }), (0, roles_1.roles)([user_model_1.UserRole.Admin]), validators_1.handleValidationResults, getFeedbacksByAdmin_1.getFeedbacksByAdmin);
    router.get("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], validators_1.handleValidationResults, getFeedbackById_1.getFeedbackById);
    router.put("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], passport_1.default.authenticate("jwt", { session: false }), validators_1.feedbackValidaion, validators_1.handleValidationResults, updateFeedback_1.updateFeedback);
    router.delete("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], passport_1.default.authenticate("jwt", { session: false }), validators_1.handleValidationResults, deleteFeedback_1.deleteFeedback);
    return router;
};
exports.makeFeedbackRouter = makeFeedbackRouter;
//# sourceMappingURL=feedback.js.map