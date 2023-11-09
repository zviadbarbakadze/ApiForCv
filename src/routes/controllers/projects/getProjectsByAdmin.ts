import { Project } from "../../../models/project.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const getProjectByAdmin = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const pageSize: number = parseInt(request.query.pageSize as string, 10);
    const page: number = parseInt(request.query.page as string, 10);
    const projects = await Project.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const totalCount = await Project.count();
    response.header("X-total-count", totalCount.toString());
    const destProjects: {
      id: number;
      userId: number;
      image: string;
      description: string;
    }[] = projects.map((project) => ({
      id: project.id,
      userId: project.userId,
      image: project.image,
      description: project.description,
    }));

    response.status(200).send(destProjects);
  } catch (error) {
    next(error);
  }
};
