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
exports.createFeedback = void 0;
const user_model_1 = require("../../../models/user.model");
const createFeedback = (request, response, next, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fromUser, companyName, toUser, content } = request.body;
        const authenticatedUser = request.user;
        if (authenticatedUser.dataValues.id !== Number(fromUser) &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(400).send("You are not allowed to add feedback");
            return;
        }
        const toOtherUser = yield user_model_1.User.findByPk(toUser);
        if (!toOtherUser) {
            response.status(404).send("user not found");
            return;
        }
        if (Number(fromUser) === Number(toUser)) {
            response
                .status(400)
                .send("you are not allowed to add feedback to yourself");
            return;
        }
        const createFeedback = yield context.services.feedbackService.registerFeedback(fromUser, companyName, toUser, content);
        const resBody = {
            id: createFeedback.id,
            fromUser: createFeedback.fromUser,
            companyName: createFeedback.companyName,
            toUser: createFeedback.toUser,
            constent: createFeedback.content,
        };
        response.status(201).send(resBody);
    }
    catch (error) {
        next(error);
    }
});
exports.createFeedback = createFeedback;
//# sourceMappingURL=createFeedback.js.map