import { Project } from "../../../models/project.model";
import { User } from "../../../models/user.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const deleteProject = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const authenticatedUser = request.user as User;

    const projectToDelete = await Project.findByPk(id);
    if (!projectToDelete) {
      response.status(404).send("project with the provided ID does not exist");
      return;
    }
    const useriD = projectToDelete.userId;
    if (
      authenticatedUser.dataValues.id !== useriD &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(403).send("You are not allowed to delete this feedback");
      return;
    }

    await projectToDelete.destroy();

    response.status(204).send("project deleted");
  } catch (error) {
    next(error);
  }
};
