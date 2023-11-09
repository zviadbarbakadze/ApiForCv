import { Experience } from "../../../models/experience.model";
import { User } from "../../../models/user.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const editExperience = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const authenticatedUser = request.user as User;

    const {
      userId,
      companyName,
      role,
      startDate,
      endDate,
      description,
    }: Experience = request.body;
    const experience = await Experience.findByPk(id);
    if (!experience) {
      response.status(404).send("experience not found");
      return;
    }
    if (
      authenticatedUser.dataValues.id !== Number(userId) &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(400).send("You are not allowed to add experience");
      return;
    }
    if (companyName) experience.companyName = companyName;
    if (role) experience.role = role;
    if (startDate) experience.startDate = startDate;
    if (endDate) experience.endDate = endDate;
    if (description) experience.description = description;

    await experience.save();
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
