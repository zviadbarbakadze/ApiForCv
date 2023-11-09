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
exports.makeAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("../middleware/multer"));
const validators_1 = require("../middleware/validators");
const user_model_1 = require("../models/user.model");
const makeAuthRouter = (context) => {
    const router = express_1.default.Router();
    // Define routes
    router.post("/register", multer_1.default.single("image"), validators_1.registrationValidation, validators_1.handleValidationResults, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, title, summary, email, password } = request.body;
            const role = user_model_1.UserRole.User;
            const image = request.file.filename;
            const userExists = yield user_model_1.User.findOne({ where: { email } });
            if (userExists) {
                response.status(400).send("email already in use");
                return;
            }
            const savedUser = yield context.services.authService.registerUser(firstName, lastName, image, title, summary, role, email, password);
            const { id: id } = savedUser;
            response.status(201).send({
                id,
                firstName,
                lastName,
                title,
                summary,
                email,
                image,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    router.post("/login", multer_1.default.none(), validators_1.loginValidation, validators_1.handleValidationResults, (request, response) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        passport_1.default.authenticate("local", (err, user, info) => {
            if (err || !user) {
                return response.status(400).json(info);
            }
            request.login(user, { session: false }, (err) => {
                if (err) {
                    return response
                        .status(500)
                        .json("Something went wrong on the server.");
                }
                const { id, firstName, lastName, title, summary, image, email, } = user.dataValues;
                const token = jsonwebtoken_1.default.sign({ id }, "asdfsfwefasdfwefwefsdf");
                return response.json({
                    user: {
                        id,
                        firstName,
                        lastName,
                        title,
                        summary,
                        email,
                        image,
                    },
                    token,
                });
            });
        })(request, response);
    });
    return router;
};
exports.makeAuthRouter = makeAuthRouter;
//# sourceMappingURL=auth.js.map