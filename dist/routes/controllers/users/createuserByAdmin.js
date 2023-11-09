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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserByAdmin = void 0;
const user_model_1 = require("../../../models/user.model");
const createUserByAdmin = (context, request, next, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = request.file.filename;
        const { firstName, lastName, title, summary, email, password, role } = request.body;
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
            role,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUserByAdmin = createUserByAdmin;
//# sourceMappingURL=createuserByAdmin.js.map