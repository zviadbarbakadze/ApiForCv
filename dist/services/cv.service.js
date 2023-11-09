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
exports.CvService = void 0;
const user_model_1 = require("../models/user.model");
const experience_model_1 = require("../models/experience.model");
const feedback_model_1 = require("../models/feedback.model");
const project_model_1 = require("../models/project.model");
class CvService {
    getCv(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findByPk(id);
                if (!user) {
                    response.status(404).send("user not found");
                    return;
                }
                const experiences = yield experience_model_1.Experience.findAll({
                    where: {
                        userId: user.id,
                    },
                });
                const feedbacksOne = yield feedback_model_1.Feedback.findAll({
                    where: {
                        fromUser: user.id,
                    },
                });
                const feedbacksTwo = yield feedback_model_1.Feedback.findAll({
                    where: {
                        toUser: user.id,
                    },
                });
                const projects = yield project_model_1.Project.findAll({
                    where: {
                        userId: user.id,
                    },
                });
                const feedbacks = feedbacksOne.concat(feedbacksTwo);
                return {
                    user,
                    experiences,
                    projects,
                    feedbacks,
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.CvService = CvService;
//# sourceMappingURL=cv.service.js.map