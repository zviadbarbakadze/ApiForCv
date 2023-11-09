import { Feedback } from "../../../models/feedback.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const getFeedbackById = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const reqId = request.params.id;
    const feedback = await Feedback.findByPk(reqId);
    if (!feedback) {
      response
        .status(404)
        .send(" feeddback with the provided ID does not exist");
      return;
    }

    response.status(200).send(feedback);
  } catch (error) {
    next(error);
  }
};
