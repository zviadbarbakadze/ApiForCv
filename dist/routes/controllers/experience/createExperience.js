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
exports.createExperience = void 0;
const user_model_1 = require("../../../models/user.model");
const createExperience = (request, response, next, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, companyName, role, startDate, endDate, description, } = request.body;
        const authenticatedUser = request.user;
        if (authenticatedUser.dataValues.id !== Number(userId) &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(400).send("You are not allowed to add experience");
            return;
        }
        const userExists = yield user_model_1.User.findByPk(userId);
        if (!userExists) {
            response.status(404).send("user not found");
            return;
        }
        const createExperience = yield context.services.experienceService.registerExperience(userId, companyName, role, startDate, endDate, description);
        const resBody = {
            id: createExperience.id,
            userId: createExperience.userId,
            companyName: createExperience.companyName,
            role: createExperience.role,
            startDate: createExperience.startDate,
            endDate: createExperience.endDate,
            description: createExperience.description,
        };
        response.status(201).send(resBody);
    }
    catch (error) {
        next(error);
    }
});
exports.createExperience = createExperience;
//# sourceMappingURL=createExperience.js.map