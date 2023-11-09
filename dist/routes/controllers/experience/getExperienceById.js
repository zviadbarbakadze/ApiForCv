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
exports.getExperienceById = void 0;
const experience_model_1 = require("../../../models/experience.model");
const getExperienceById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const experience = yield experience_model_1.Experience.findByPk(id);
        if (!experience) {
            response
                .status(404)
                .send("The experience with the provided ID does not exist");
            return;
        }
        const { userId, companyName, role, startDate, endDate, description } = experience;
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
exports.getExperienceById = getExperienceById;
//# sourceMappingURL=getExperienceById.js.map