import { Context, RouterFactory } from "../interfaces/general";
import express, { NextFunction, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer";
import {
  registrationValidation,
  loginValidation,
  handleValidationResults,
} from "../middleware/validators";
import { ExtendedRequest } from "../interfaces/express";
import { User, UserRole } from "../models/user.model";

export const makeAuthRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  // Define routes
  router.post(
    "/register",
    upload.single("image"),
    registrationValidation,
    handleValidationResults,
    async (
      request: ExtendedRequest,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const { firstName, lastName, title, summary, email, password }: User =
          request.body;
        const role = UserRole.User;
        const image = request.file.filename;
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
          image,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/login",
    upload.none(),
    loginValidation,
    handleValidationResults,
    (request: ExtendedRequest, response: Response) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err || !user) {
          return response.status(400).json(info);
        }
        request.login(user, { session: false }, (err) => {
          if (err) {
            return response
              .status(500)
              .json("Something went wrong on the server.");
          }
          const {
            id,
            firstName,
            lastName,
            title,
            summary,
            image,
            email,
          }: User = user.dataValues;
          const token = jwt.sign({ id }, "asdfsfwefasdfwefwefsdf");
          return response.json({
            user: {
              id,
              firstName,
              lastName,
              title,
              summary,
              email,
              image,
            },
            token,
          });
        });
      })(request, response);
    }
  );

  return router;
};
