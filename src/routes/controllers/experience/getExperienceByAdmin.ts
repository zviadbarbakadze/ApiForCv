import { Experience } from "../../../models/experience.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const getExperienceByAdmin = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const pageSize: number = parseInt(request.query.pageSize as string, 10);
    const page: number = parseInt(request.query.page as string, 10);
    const experiences = await Experience.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const totalCount = await Experience.count();
    response.header("X-total-count", totalCount.toString());

    const destExperience: {
      id: number;
      userId: number;
      companyName: string;
      role: string;
      startDate: Date;
      endDate: Date;
      description: string;
    }[] = experiences.map((exper) => ({
      id: exper.id,
      userId: exper.userId,
      companyName: exper.companyName,
      role: exper.role,
      startDate: exper.startDate,
      endDate: exper.endDate,
      description: exper.description,
    }));
    response.status(200).send(destExperience);
  } catch (error) {
    next(error);
  }
};
