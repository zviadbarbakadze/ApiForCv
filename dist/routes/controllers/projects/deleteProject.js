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
exports.deleteProject = void 0;
const project_model_1 = require("../../../models/project.model");
const deleteProject = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const authenticatedUser = request.user;
        const projectToDelete = yield project_model_1.Project.findByPk(id);
        if (!projectToDelete) {
            response.status(404).send("project with the provided ID does not exist");
            return;
        }
        const useriD = projectToDelete.userId;
        if (authenticatedUser.dataValues.id !== useriD &&
            authenticatedUser.dataValues.role !== "Admin") {
            response.status(403).send("You are not allowed to delete this feedback");
            return;
        }
        yield projectToDelete.destroy();
        response.status(204).send("project deleted");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=deleteProject.js.map