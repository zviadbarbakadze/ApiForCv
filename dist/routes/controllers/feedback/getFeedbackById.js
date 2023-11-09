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
exports.getFeedbackById = void 0;
const feedback_model_1 = require("../../../models/feedback.model");
const getFeedbackById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqId = request.params.id;
        const feedback = yield feedback_model_1.Feedback.findByPk(reqId);
        if (!feedback) {
            response
                .status(404)
                .send(" feeddback with the provided ID does not exist");
            return;
        }
        response.status(200).send(feedback);
    }
    catch (error) {
        next(error);
    }
});
exports.getFeedbackById = getFeedbackById;
//# sourceMappingURL=getFeedbackById.js.map