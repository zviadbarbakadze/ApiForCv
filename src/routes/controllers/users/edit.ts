import { NextFunction, Response } from "express";
import { User } from "../../../models/user.model";
import { ExtendedRequest } from "../../../interfaces/express";
import * as bcrypt from "bcrypt";
export const editByUser = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const authenticatedUser = request.user as User;
    const reqId = authenticatedUser.dataValues.id;

    const { firstName, lastName, title, summary, email, password, role }: User =
      request.body;

    const user = await User.findByPk(id);
    if (!user) {
      response.status(404).send("A user with the provided ID is not found");
      return;
    }

    if (reqId !== Number(id)) {
      response
        .status(403)
        .send("You are not allowed to update another user's profile");
      return;
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (title) user.title = title;
    if (summary) user.summary = summary;
    if (email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return response.status(400).send("email already in use");
      } else {
        user.email = email;
      }
    }
    if (role) user.role = role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    response.status(200).send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      summary: user.summary,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
