import { Project } from "../../../models/project.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const getProjectById = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const reqId = request.params.id;
    const project = await Project.findByPk(reqId);
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
  } catch (error) {
    next(error);
  }
};
