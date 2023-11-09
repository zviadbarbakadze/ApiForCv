import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../../interfaces/express";
import { User } from "../../../models/user.model";
export const getUserById = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    request.logger.info("meaning this?");
    const user = await User.findByPk(id);
    if (!user) {
      response.status(404).send("The user with the provided ID does not exist");
      return;
    }
    const { firstName, lastName, title, summary, email, password, role } = user;
    response.send({
      id,
      firstName,
      lastName,
      title,
      summary,
      email,
      password,
      role,
    });
  } catch (error) {
    next(error);
  }
};
