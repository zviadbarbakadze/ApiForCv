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
exports.updateProject = void 0;
const project_model_1 = require("../../../models/project.model");
const updateProject = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const authenticatedUser = request.user;
        const { userId, image, description } = request.body;
        const project = yield project_model_1.Project.findByPk(id);
        if (!project) {
            response.status(404).send("project not found");
            return;
        }
        if (authenticatedUser.dataValues.id !== Number(userId) &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(400).send("You are not allowed to add project");
            return;
        }
        if (image)
            project.image = image;
        if (description)
            project.description = description;
        yield project.save();
        const responseBody = {
            id: project.id,
            userId: project.userId,
            image: project.image,
            description: project.description,
        };
        response.status(200).send(responseBody);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProject = updateProject;
//# sourceMappingURL=updateProject.js.map