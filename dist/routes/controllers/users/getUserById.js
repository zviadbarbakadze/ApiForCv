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
exports.getUserById = void 0;
const user_model_1 = require("../../../models/user.model");
const getUserById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        request.logger.info("meaning this?");
        const user = yield user_model_1.User.findByPk(id);
        if (!user) {
            response.status(404).send("The user with the provided ID does not exist");
            return;
        }
        const { firstName, lastName, title, summary, email, password, role } = user;
        response.send({
            id,
            firstName,
            lastName,
            title,
            summary,
            email,
            password,
            role,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=getUserById.js.map