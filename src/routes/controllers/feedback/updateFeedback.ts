import { Feedback } from "../../../models/feedback.model";
import { User } from "../../../models/user.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const updateFeedback = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const authenticatedUser = request.user as User;

    const { fromUser, companyName, toUser, content }: Feedback = request.body;
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      response.status(404).send("feedback not found");
      return;
    }
    if (
      authenticatedUser.dataValues.id !== Number(fromUser) &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(400).send("You are not allowed to add experience");
      return;
    }

    if (companyName) feedback.companyName = companyName;
    if (toUser) feedback.toUser = toUser;
    if (content) feedback.content = content;

    await feedback.save();
    response.status(200).send(feedback);
  } catch (error) {
    next(error);
  }
};
