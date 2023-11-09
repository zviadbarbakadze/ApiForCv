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
exports.ExperienceService = void 0;
// import { Models } from "../interfaces/general";
const experience_model_1 = require("../models/experience.model");
class ExperienceService {
    registerExperience(userId, companyName, role, startDate, endDate, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newExperience = yield experience_model_1.Experience.create({
                    userId,
                    companyName,
                    role,
                    startDate,
                    endDate,
                    description,
                });
                return newExperience;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ExperienceService = ExperienceService;
//# sourceMappingURL=experience.service.js.map