import { User } from "../../../models/user.model";
import { Experience } from "../../../models/experience.model";

import { Context } from "../../../interfaces/general";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const createExperience = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
  context: Context
) => {
  try {
    const {
      userId,
      companyName,
      role,
      startDate,
      endDate,
      description,
    }: Experience = request.body;
    const authenticatedUser = request.user as User;

    if (
      authenticatedUser.dataValues.id !== Number(userId) &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(400).send("You are not allowed to add experience");
      return;
    }
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      response.status(404).send("user not found");
      return;
    }
    const createExperience =
      await context.services.experienceService.registerExperience(
        userId,
        companyName,
        role,
        startDate,
        endDate,
        description
      );
    const resBody = {
      id: createExperience.id,
      userId: createExperience.userId,
      companyName: createExperience.companyName,
      role: createExperience.role,
      startDate: createExperience.startDate,
      endDate: createExperience.endDate,
      description: createExperience.description,
    };
    response.status(201).send(resBody);
  } catch (error) {
    next(error);
  }
};
