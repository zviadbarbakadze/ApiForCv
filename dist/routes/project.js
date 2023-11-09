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
exports.makeProjectRouter = void 0;
const express_1 = __importDefault(require("express"));
const roles_1 = require("../middleware/roles");
const user_model_1 = require("../models/user.model");
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("../middleware/multer"));
const createProject_1 = require("./controllers/projects/createProject");
const validators_1 = require("../middleware/validators");
const getProjectsByAdmin_1 = require("./controllers/projects/getProjectsByAdmin");
const getProjectById_1 = require("./controllers/projects/getProjectById");
const updateProject_1 = require("./controllers/projects/updateProject");
const deleteProject_1 = require("./controllers/projects/deleteProject");
const express_validator_1 = require("express-validator");
const makeProjectRouter = (context) => {
    const router = express_1.default.Router();
    router.post("/", multer_1.default.single("image"), passport_1.default.authenticate("jwt", { session: false }), validators_1.projectsValidation, validators_1.handleValidationResults, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () { return (0, createProject_1.createProject)(request, response, next, context); }));
    router.get("/", (0, express_validator_1.check)("pageSize").isInt().toInt().escape().withMessage("validation failed"), (0, express_validator_1.check)("page").isInt().toInt().escape().withMessage("validation failed"), passport_1.default.authenticate("jwt", { session: false }), (0, roles_1.roles)([user_model_1.UserRole.Admin]), validators_1.handleValidationResults, getProjectsByAdmin_1.getProjectByAdmin);
    router.get("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], validators_1.handleValidationResults, getProjectById_1.getProjectById);
    router.put("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], multer_1.default.single("image"), passport_1.default.authenticate("jwt", { session: false }), validators_1.handleValidationResults, updateProject_1.updateProject);
    router.delete("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], passport_1.default.authenticate("jwt", { session: false }), validators_1.handleValidationResults, deleteProject_1.deleteProject);
    return router;
};
exports.makeProjectRouter = makeProjectRouter;
//# sourceMappingURL=project.js.map