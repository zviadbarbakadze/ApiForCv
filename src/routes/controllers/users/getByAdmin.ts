import { NextFunction, Response } from "express";
import { User } from "../../../models/user.model";
import { ExtendedRequest } from "../../../interfaces/express";

export const getByAdmin = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const pageSize: number = parseInt(request.query.pageSize as string, 10);
    const page: number = parseInt(request.query.page as string, 10);
    const users = await User.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    const totalCount = await User.count();

    response.header("X-total-count", totalCount.toString());
    const destUsers: {
      id: number;
      firstName: string;
      lastName: string;
      title: string;
      summary: string;
      email: string;
      role: string;
    }[] = users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      summary: user.summary,
      email: user.email,
      role: user.role,
    }));
    response.status(200).send(destUsers);
  } catch (error) {
    next(error);
  }
};
