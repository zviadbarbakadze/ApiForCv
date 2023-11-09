import { NextFunction, Response } from "express";
import { User } from "../../../models/user.model";
import { Context } from "../../../interfaces/general";
import { Project } from "../../../models/project.model";
import { ExtendedRequest } from "../../../interfaces/express";

export const createProject = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
  context: Context
) => {
  try {
    const { userId, description }: Project = request.body;
    const image = request.file.filename;
    const authenticatedUser = request.user as User;
    const findUser = await User.findByPk(userId);

    if (!findUser) {
      response.status(404).send("user not found with provided Id");
      return;
    }

    if (
      authenticatedUser.dataValues.id !== Number(userId) &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(400).send("You are not allowed to add project");
      return;
    }

    const project = await context.services.projectService.registerProject(
      userId,
      image,
      description
    );
    const responseBody = {
      id: project.id,
      userId: project.userId,
      image: project.image,
      description: project.description,
    };
    response.status(201).send(responseBody);
  } catch (error) {
    next(error);
  }
};
