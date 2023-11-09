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
exports.updateFeedback = void 0;
const feedback_model_1 = require("../../../models/feedback.model");
const updateFeedback = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const authenticatedUser = request.user;
        const { fromUser, companyName, toUser, content } = request.body;
        const feedback = yield feedback_model_1.Feedback.findByPk(id);
        if (!feedback) {
            response.status(404).send("feedback not found");
            return;
        }
        if (authenticatedUser.dataValues.id !== Number(fromUser) &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(400).send("You are not allowed to add experience");
            return;
        }
        if (companyName)
            feedback.companyName = companyName;
        if (toUser)
            feedback.toUser = toUser;
        if (content)
            feedback.content = content;
        yield feedback.save();
        response.status(200).send(feedback);
    }
    catch (error) {
        next(error);
    }
});
exports.updateFeedback = updateFeedback;
//# sourceMappingURL=updateFeedback.js.map