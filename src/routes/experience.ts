import { Context, RouterFactory } from "../interfaces/general";
import express, { NextFunction, Response } from "express";
import { roles } from "../middleware/roles";
import { UserRole } from "../models/user.model";
import passport from "passport";
import { createExperience } from "./controllers/experience/createExperience";
import {
  experienceValidation,
  handleValidationResults,
} from "../middleware/validators";
import { getExperienceByAdmin } from "./controllers/experience/getExperienceByAdmin";
import { getExperienceById } from "./controllers/experience/getExperienceById";

import { editExperience } from "./controllers/experience/editExperience";
import { deleteExperience } from "./controllers/experience/deleteExperience";
import { ExtendedRequest } from "../interfaces/express";
import { check } from "express-validator";
export const makeExperienceRouter: RouterFactory = (context: Context) => {
  const router = express.Router();

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    experienceValidation,
    handleValidationResults,
    async (request: ExtendedRequest, response: Response, next: NextFunction) =>
      createExperience(request, response, next, context)
  );

  router.get(
    "/",
    check("pageSize").isInt().toInt().escape().withMessage("validation failed"),
    check("page").isInt().toInt().escape().withMessage("validation failed"),
    passport.authenticate("jwt", { session: false }),
    roles([UserRole.Admin]),
    handleValidationResults,
    getExperienceByAdmin
  );
  router.get(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    handleValidationResults,
    getExperienceById
  );

  router.put(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    passport.authenticate("jwt", { session: false }),
    experienceValidation,
    handleValidationResults,
    editExperience
  );
  router.delete(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    passport.authenticate("jwt", { session: false }),
    handleValidationResults,
    deleteExperience
  );
  return router;
};
