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
exports.getFeedbacksByAdmin = void 0;
const feedback_model_1 = require("../../../models/feedback.model");
const getFeedbacksByAdmin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = parseInt(request.query.pageSize, 10);
        const page = parseInt(request.query.page, 10);
        const experiences = yield feedback_model_1.Feedback.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });
        const totalCount = yield feedback_model_1.Feedback.count();
        response.header("X-total-count", totalCount.toString());
        response.status(200).send(experiences);
    }
    catch (error) {
        next(error);
    }
});
exports.getFeedbacksByAdmin = getFeedbacksByAdmin;
//# sourceMappingURL=getFeedbacksByAdmin.js.map