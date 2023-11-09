import { Context, RouterFactory } from "../interfaces/general";
import { UserRole } from "../models/user.model";
import express, { NextFunction, Response } from "express";
import passport from "passport";
import { roles } from "../middleware/roles";

import upload from "../middleware/multer";
import {
  registrationValidation,
  handleValidationResults,
} from "../middleware/validators";
import { getByAdmin } from "./controllers/users/getByAdmin";
import { getUserById } from "./controllers/users/getUserById";
import { editByUser } from "./controllers/users/edit";
import { deleteUser } from "./controllers/users/deleteUser";
import { createUserByAdmin } from "./controllers/users/createuserByAdmin";
import { ExtendedRequest } from "../interfaces/express";
import { check } from "express-validator";

export const makeUsersRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post(
    "/",
    upload.single("image"),
    passport.authenticate("jwt", { session: false }),
    roles([UserRole.Admin]),
    registrationValidation,
    handleValidationResults,
    async (request: ExtendedRequest, response: Response, next: NextFunction) =>
      createUserByAdmin(context, request, next, response)
  );
  router.get(
    "/",
    check("pageSize").isInt().toInt().escape().withMessage("validation failed"),
    check("page").isInt().toInt().escape().withMessage("validation failed"),
    passport.authenticate("jwt", { session: false }),
    roles([UserRole.Admin]),
    handleValidationResults,
    getByAdmin
  );
  router.get(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    handleValidationResults,
    getUserById
  );
  router.put(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    upload.single("image"),
    passport.authenticate("jwt", { session: false }),
    handleValidationResults,
    editByUser
  );
  router.delete(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    passport.authenticate("jwt", { session: false }),
    handleValidationResults,
    deleteUser
  );
  return router;
};
