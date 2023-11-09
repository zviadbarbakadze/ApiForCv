import { Feedback } from "../../../models/feedback.model";
import { User } from "../../../models/user.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const deleteFeedback = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const authenticatedUser = request.user as User;

    const feedbackToDelete = await Feedback.findByPk(id);
    if (!feedbackToDelete) {
      response.status(404).send("feedback with the provided ID does not exist");
      return;
    }

    const useriD = feedbackToDelete.fromUser;
    if (
      authenticatedUser.dataValues.id !== useriD &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(403).send("You are not allowed to delete this feedback");
      return;
    }

    await feedbackToDelete.destroy();

    response.status(204).send("feedback deleted");
  } catch (error) {
    next(error);
  }
};
