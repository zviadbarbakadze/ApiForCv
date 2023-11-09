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
exports.makeUsersRouter = void 0;
const user_model_1 = require("../models/user.model");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const roles_1 = require("../middleware/roles");
const multer_1 = __importDefault(require("../middleware/multer"));
const validators_1 = require("../middleware/validators");
const getByAdmin_1 = require("./controllers/users/getByAdmin");
const getUserById_1 = require("./controllers/users/getUserById");
const edit_1 = require("./controllers/users/edit");
const deleteUser_1 = require("./controllers/users/deleteUser");
const createuserByAdmin_1 = require("./controllers/users/createuserByAdmin");
const express_validator_1 = require("express-validator");
const makeUsersRouter = (context) => {
    const router = express_1.default.Router();
    router.post("/", multer_1.default.single("image"), passport_1.default.authenticate("jwt", { session: false }), (0, roles_1.roles)([user_model_1.UserRole.Admin]), validators_1.registrationValidation, validators_1.handleValidationResults, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () { return (0, createuserByAdmin_1.createUserByAdmin)(context, request, next, response); }));
    router.get("/", (0, express_validator_1.check)("pageSize").isInt().toInt().escape().withMessage("validation failed"), (0, express_validator_1.check)("page").isInt().toInt().escape().withMessage("validation failed"), passport_1.default.authenticate("jwt", { session: false }), (0, roles_1.roles)([user_model_1.UserRole.Admin]), validators_1.handleValidationResults, getByAdmin_1.getByAdmin);
    router.get("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], validators_1.handleValidationResults, getUserById_1.getUserById);
    router.put("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], multer_1.default.single("image"), passport_1.default.authenticate("jwt", { session: false }), validators_1.handleValidationResults, edit_1.editByUser);
    router.delete("/:id", [(0, express_validator_1.check)("id").isInt().toInt().escape().withMessage("validation failed")], passport_1.default.authenticate("jwt", { session: false }), validators_1.handleValidationResults, deleteUser_1.deleteUser);
    return router;
};
exports.makeUsersRouter = makeUsersRouter;
//# sourceMappingURL=user.js.map