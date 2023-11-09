import { Context, RouterFactory } from "../interfaces/general";
import express, { NextFunction, Response } from "express";
import { createFeedback } from "./controllers/feedback/createFeedback";
import passport from "passport";
import { roles } from "../middleware/roles";
import { UserRole } from "../models/user.model";
import {
  feedbackValidaion,
  handleValidationResults,
} from "../middleware/validators";
import { getFeedbacksByAdmin } from "./controllers/feedback/getFeedbacksByAdmin";
import { getFeedbackById } from "./controllers/feedback/getFeedbackById";
import { updateFeedback } from "./controllers/feedback/updateFeedback";
import { deleteFeedback } from "./controllers/feedback/deleteFeedback";
import { ExtendedRequest } from "../interfaces/express";
import { check } from "express-validator";
export const makeFeedbackRouter: RouterFactory = (context: Context) => {
  const router = express.Router();
  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    feedbackValidaion,
    handleValidationResults,
    async (request: ExtendedRequest, response: Response, next: NextFunction) =>
      createFeedback(request, response, next, context)
  );
  router.get(
    "/",
    check("pageSize").isInt().toInt().escape().withMessage("validation failed"),
    check("page").isInt().toInt().escape().withMessage("validation failed"),
    passport.authenticate("jwt", { session: false }),
    roles([UserRole.Admin]),
    handleValidationResults,
    getFeedbacksByAdmin
  );
  router.get(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    handleValidationResults,
    getFeedbackById
  );
  router.put(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    passport.authenticate("jwt", { session: false }),
    feedbackValidaion,
    handleValidationResults,
    updateFeedback
  );

  router.delete(
    "/:id",
    [check("id").isInt().toInt().escape().withMessage("validation failed")],
    passport.authenticate("jwt", { session: false }),
    handleValidationResults,
    deleteFeedback
  );
  return router;
};
