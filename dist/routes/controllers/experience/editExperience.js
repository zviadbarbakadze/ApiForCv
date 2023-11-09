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
exports.editExperience = void 0;
const experience_model_1 = require("../../../models/experience.model");
const editExperience = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const authenticatedUser = request.user;
        const { userId, companyName, role, startDate, endDate, description, } = request.body;
        const experience = yield experience_model_1.Experience.findByPk(id);
        if (!experience) {
            response.status(404).send("experience not found");
            return;
        }
        if (authenticatedUser.dataValues.id !== Number(userId) &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(400).send("You are not allowed to add experience");
            return;
        }
        if (companyName)
            experience.companyName = companyName;
        if (role)
            experience.role = role;
        if (startDate)
            experience.startDate = startDate;
        if (endDate)
            experience.endDate = endDate;
        if (description)
            experience.description = description;
        yield experience.save();
        response.status(200).send({
            id,
            userId,
            companyName,
            role,
            startDate,
            endDate,
            description,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editExperience = editExperience;
//# sourceMappingURL=editExperience.js.map