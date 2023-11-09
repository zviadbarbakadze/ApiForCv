import { NextFunction, Response } from "express";
import { User } from "../../../models/user.model";
import { Context } from "../../../interfaces/general";
import { ExtendedRequest } from "../../../interfaces/express";
export const createUserByAdmin = async (
  context: Context,
  request: ExtendedRequest,
  next: NextFunction,
  response: Response
) => {
  try {
    const image = request.file.filename;
    const { firstName, lastName, title, summary, email, password, role }: User =
      request.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      response.status(400).send("email already in use");
      return;
    }
    const savedUser = await context.services.authService.registerUser(
      firstName,
      lastName,
      image,
      title,
      summary,
      role,
      email,
      password
    );

    const { id: id } = savedUser;
    response.status(201).send({
      id,
      firstName,
      lastName,
      title,
      summary,
      email,
      role,
    });
  } catch (error) {
    next(error);
  }
};
