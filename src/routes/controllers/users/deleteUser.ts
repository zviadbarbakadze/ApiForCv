import { NextFunction, Response } from "express";
import { User } from "../../../models/user.model";
import { ExtendedRequest } from "../../../interfaces/express";
export const deleteUser = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const idToDelete = parseInt(request.params.id, 10);
    const authenticatedUser = request.user as User;

    if (
      authenticatedUser.dataValues.id !== idToDelete &&
      authenticatedUser.dataValues.role !== "Admin"
    ) {
      response
        .status(403)
        .send("You are not allowed to delete this user's account");
      return;
    }

    const userToDelete = await User.findByPk(idToDelete);

    if (!userToDelete) {
      response.status(404).send("A user with the provided ID does not exist");
      return;
    }

    await userToDelete.destroy();

    response.status(204).send("user deleted");
  } catch (error) {
    next(error);
  }
};
