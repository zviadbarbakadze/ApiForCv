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
exports.deleteFeedback = void 0;
const feedback_model_1 = require("../../../models/feedback.model");
const deleteFeedback = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const authenticatedUser = request.user;
        const feedbackToDelete = yield feedback_model_1.Feedback.findByPk(id);
        if (!feedbackToDelete) {
            response.status(404).send("feedback with the provided ID does not exist");
            return;
        }
        const useriD = feedbackToDelete.fromUser;
        if (authenticatedUser.dataValues.id !== useriD &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(403).send("You are not allowed to delete this feedback");
            return;
        }
        yield feedbackToDelete.destroy();
        response.status(204).send("feedback deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFeedback = deleteFeedback;
//# sourceMappingURL=deleteFeedback.js.map