import { Feedback } from "../../../models/feedback.model";
import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
export const getFeedbacksByAdmin = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const pageSize: number = parseInt(request.query.pageSize as string, 10);
    const page: number = parseInt(request.query.page as string, 10);
    const experiences = await Feedback.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    const totalCount = await Feedback.count();
    response.header("X-total-count", totalCount.toString());

    response.status(200).send(experiences);
  } catch (error) {
    next(error);
  }
};
