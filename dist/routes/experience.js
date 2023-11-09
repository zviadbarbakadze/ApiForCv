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
exports.makeExperienceRouter = void 0;
const express_1 = __importDefault(require("express"));
const roles_1 = require("../middleware/roles");
const user_model_1 = require("../models/user.model");
const passport_1 = __importDefault(require("passport"));
const createExperience_1 = require("./controllers/experience/createExperience");
const validators_1 = require("../middleware/validators");
const getExperienceByAdmin_1 = require("./controllers/experience/getExperienceByAdmin");
const getExperienceById_1 = require("./controllers/experience/getExperienceById");
const editExperience_1 = require("./controllers/experience/editExperience");
const deleteExperience_1 = require("./controllers/experience/deleteExperience");
const express_validator_1 = require("express-validator");
const makeExperienceRouter = (context) => {
    const router = express_1.default.Router();
    router.post("/", passport_1.default.authenticate("jwt", { session: false }), validators_1.experienceValidation, validators_1.handleValidationResults, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () { return (0, createExperience_1.createExperience)(request, response, next, context); }));
    router.get("/", (0, express_validator_1.check)("pageSize").isInt().toInt().escape().withMessage("validation failed"), (0, express_validator_1.check)("page").isInt().toInt().escape().withMessage("validation failed"), passport_1.default.authenticate("jwt", { session: false }), (0, roles_1.roles)([user_model_1.UserRole.Admin]), validators_1.handleValidationResults, getExperienceByAdmin_1.getExperienceByAdmin);
    router.get("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], validators_1.handleValidationResults, getExperienceById_1.getExperienceById);
    router.put("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], passport_1.default.authenticate("jwt", { session: false }), validators_1.experienceValidation, validators_1.handleValidationResults, editExperience_1.editExperience);
    router.delete("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], passport_1.default.authenticate("jwt", { session: false }), validators_1.handleValidationResults, deleteExperience_1.deleteExperience);
    return router;
};
exports.makeExperienceRouter = makeExperienceRouter;
//# sourceMappingURL=experience.js.map