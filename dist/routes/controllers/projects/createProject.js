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
exports.createProject = void 0;
const user_model_1 = require("../../../models/user.model");
const createProject = (request, response, next, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, description } = request.body;
        const image = request.file.filename;
        const authenticatedUser = request.user;
        const findUser = yield user_model_1.User.findByPk(userId);
        if (!findUser) {
            response.status(404).send("user not found with provided Id");
            return;
        }
        if (authenticatedUser.dataValues.id !== Number(userId) &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(400).send("You are not allowed to add project");
            return;
        }
        const project = yield context.services.projectService.registerProject(userId, image, description);
        const responseBody = {
            id: project.id,
            userId: project.userId,
            image: project.image,
            description: project.description,
        };
        response.status(201).send(responseBody);
    }
    catch (error) {
        next(error);
    }
});
exports.createProject = createProject;
//# sourceMappingURL=createProject.js.map