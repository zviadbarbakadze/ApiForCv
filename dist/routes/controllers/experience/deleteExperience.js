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
exports.deleteExperience = void 0;
const experience_model_1 = require("../../../models/experience.model");
const deleteExperience = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const authenticatedUser = request.user;
        const experienceToDelete = yield experience_model_1.Experience.findByPk(id);
        if (!experienceToDelete) {
            response
                .status(404)
                .send("An experience with the provided ID does not exist");
            return;
        }
        const userId = experienceToDelete.userId;
        if (authenticatedUser.dataValues.id !== userId &&
            authenticatedUser.dataValues.role !== "Admin") {
            response
                .status(403)
                .send("You are not allowed to delete this experience");
            return;
        }
        yield experienceToDelete.destroy();
        response.status(204).send("experience deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteExperience = deleteExperience;
//# sourceMappingURL=deleteExperience.js.map