import { Context, RouterFactory } from "../interfaces/general";
import express, { NextFunction, Response } from "express";
import { roles } from "../middleware/roles";
import { UserRole } from "../models/user.model";
import passport from "passport";
import upload from "../middleware/multer";
import { createProject } from "./controllers/projects/createProject";
import {
  projectsValidation,
  handleValidationResults,
} from "../middleware/validators";
import { getProjectByAdmin } from "./controllers/projects/getProjectsByAdmin";
import { getProjectById } from "./controllers/projects/getProjectById";
import { updateProject } from "./controllers/projects/updateProject";
import { deleteProject } from "./controllers/projects/deleteProject";
import { ExtendedRequest } from "../interfaces/express";
import { check } from "express-validator";

export const makeProjectRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post(
    "/",
    upload.single("image"),
    passport.authenticate("jwt", { session: false }),
    projectsValidation,
    handleValidationResults,
    async (request: ExtendedRequest, response: Response, next: NextFunction) =>
      createProject(request, response, next, context)
  );

  router.get(
    "/",
    check("pageSize").isInt().toInt().escape().withMessage("validation failed"),
    check("page").isInt().toInt().escape().withMessage("validation failed"),
    passport.authenticate("jwt", { session: false }),
    roles([UserRole.Admin]),
    handleValidationResults,
    getProjectByAdmin
  );

  router.get(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    handleValidationResults,
    getProjectById
  );
  router.put(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    upload.single("image"),
    passport.authenticate("jwt", { session: false }),
    handleValidationResults,
    updateProject
  );

  router.delete(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    passport.authenticate("jwt", { session: false }),
    handleValidationResults,
    deleteProject
  );
  return router;
};
