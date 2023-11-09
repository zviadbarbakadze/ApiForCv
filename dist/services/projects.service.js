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
exports.ProjectService = void 0;
const project_model_1 = require("../models/project.model");
class ProjectService {
    registerProject(userId, image, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProject = yield project_model_1.Project.create({
                    userId,
                    image,
                    description,
                });
                return newProject;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=projects.service.js.map