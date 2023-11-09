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
exports.getProjectById = void 0;
const project_model_1 = require("../../../models/project.model");
const getProjectById = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqId = request.params.id;
        const project = yield project_model_1.Project.findByPk(reqId);
        if (!project) {
            response
                .status(404)
                .send("The project with the provided ID does not exist");
            return;
        }
        const id = Number(reqId);
        const { userId, image, description } = project;
        response.status(200).send({
            id,
            userId,
            image,
            description,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProjectById = getProjectById;
//# sourceMappingURL=getProjectById.js.map