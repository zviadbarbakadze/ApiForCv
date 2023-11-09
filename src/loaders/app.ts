import { loadMiddlewares } from "./middlewares";
import { loadRoutes } from "./routes";
import express from "express";
import { loadContext } from "./context";
import { loadModels } from "./models";
import { loadSequelize } from "./sequelize";
import { config } from "../config";
import { loadPassport } from "./passport";

import requestId from "express-request-id";
import { errorHandler } from "../middleware/errorHandler";

export const loadApp = async () => {
  const app = express();
  app.use(requestId());
  app.use(express.json());

  const sequelize = loadSequelize(config);

  loadModels(sequelize);

  const context = await loadContext();

  loadPassport(app, context);
  loadMiddlewares(app, context);

  loadRoutes(app, context);
  errorHandler(app, context);

  return app;
};
