import { Experience } from "../../../models/experience.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const getExperienceById = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;

    const experience = await Experience.findByPk(id);
    if (!experience) {
      response
        .status(404)
        .send("The experience with the provided ID does not exist");
      return;
    }

    const { userId, companyName, role, startDate, endDate, description } =
      experience;
    response.status(200).send({
      id,
      userId,
      companyName,
      role,
      startDate,
      endDate,
      description,
    });
  } catch (error) {
    next(error);
  }
};
