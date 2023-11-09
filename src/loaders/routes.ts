import express from "express";
import { Context } from "../interfaces/general";
import { makeAuthRouter } from "../routes/auth";
import { makeUsersRouter } from "../routes/user";
import { makeExperienceRouter } from "../routes/experience";
import { makeFeedbackRouter } from "../routes/feedback";
import { makeProjectRouter } from "../routes/project";
import { makeCv } from "../routes/cv";

export const loadRoutes = (app: express.Router, context: Context) => {
  app.use("/api/auth", makeAuthRouter(context));
  app.use("/api/users", makeUsersRouter(context));
  app.use("/api/experience", makeExperienceRouter(context));
  app.use("/api/feedback", makeFeedbackRouter(context));
  app.use("/api/projects", makeProjectRouter(context));
  app.use("/api/user", makeCv(context));
};
