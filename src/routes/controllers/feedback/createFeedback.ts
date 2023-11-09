import { NextFunction, Response } from "express";
import { User } from "../../../models/user.model";
import { Feedback } from "../../../models/feedback.model";
import { Context } from "../../../interfaces/general";
import { ExtendedRequest } from "../../../interfaces/express";
export const createFeedback = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
  context: Context
) => {
  try {
    const { fromUser, companyName, toUser, content }: Feedback = request.body;
    const authenticatedUser = request.user as User;

    if (
      authenticatedUser.dataValues.id !== Number(fromUser) &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response.status(400).send("You are not allowed to add feedback");
      return;
    }
    const toOtherUser = await User.findByPk(toUser);
    if (!toOtherUser) {
      response.status(404).send("user not found");
      return;
    }
    if (Number(fromUser) === Number(toUser)) {
      response
        .status(400)
        .send("you are not allowed to add feedback to yourself");
      return;
    }
    const createFeedback =
      await context.services.feedbackService.registerFeedback(
        fromUser,
        companyName,
        toUser,
        content
      );
    const resBody = {
      id: createFeedback.id,
      fromUser: createFeedback.fromUser,
      companyName: createFeedback.companyName,
      toUser: createFeedback.toUser,
      constent: createFeedback.content,
    };
    response.status(201).send(resBody);
  } catch (error) {
    next(error);
  }
};
