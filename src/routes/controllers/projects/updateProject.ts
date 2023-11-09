import { Project } from "../../../models/project.model";
import { User } from "../../../models/user.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const updateProject = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const authenticatedUser = request.user as User;

    const { userId, image, description }: Project = request.body;
    const project = await Project.findByPk(id);
    if (!project) {
      response.status(404).send("project not found");
      return;
    }
    if (
      authenticatedUser.dataValues.id !== Number(userId) &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(400).send("You are not allowed to add project");
      return;
    }

    if (image) project.image = image;
    if (description) project.description = description;

    await project.save();
    const responseBody = {
      id: project.id,
      userId: project.userId,
      image: project.image,
      description: project.description,
    };
    response.status(200).send(responseBody);
  } catch (error) {
    next(error);
  }
};
