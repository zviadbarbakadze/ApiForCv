import { Experience } from "../../../models/experience.model";
import { User } from "../../../models/user.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const deleteExperience = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;

    const authenticatedUser = request.user as User;

    const experienceToDelete = await Experience.findByPk(id);
    if (!experienceToDelete) {
      response
        .status(404)
        .send("An experience with the provided ID does not exist");
      return;
    }
    const userId = experienceToDelete.userId;

    if (
      authenticatedUser.dataValues.id !== userId &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response
        .status(403)
        .send("You are not allowed to delete this experience");
      return;
    }

    await experienceToDelete.destroy();

    response.status(204).send("experience deleted");
  } catch (error) {
    next(error);
  }
};
