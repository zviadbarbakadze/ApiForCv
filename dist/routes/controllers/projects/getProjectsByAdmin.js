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
exports.getProjectByAdmin = void 0;
const project_model_1 = require("../../../models/project.model");
const getProjectByAdmin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = parseInt(request.query.pageSize, 10);
        const page = parseInt(request.query.page, 10);
        const projects = yield project_model_1.Project.findAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });
        const totalCount = yield project_model_1.Project.count();
        response.header("X-total-count", totalCount.toString());
        const destProjects = projects.map((project) => ({
            id: project.id,
            userId: project.userId,
            image: project.image,
            description: project.description,
        }));
        response.status(200).send(destProjects);
    }
    catch (error) {
        next(error);
    }
});
exports.getProjectByAdmin = getProjectByAdmin;
//# sourceMappingURL=getProjectsByAdmin.js.map