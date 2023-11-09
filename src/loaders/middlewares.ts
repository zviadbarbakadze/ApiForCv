import { Loader } from "../interfaces/general";
import { logger } from "../libs/logger";
import { ExtendedRequest } from "../interfaces/express";
import { Response, NextFunction } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loadMiddlewares: Loader = (app, _context) => {
  app.use((req: ExtendedRequest, res: Response, next: NextFunction) => {
    const correlationId = req.id;
    logger.info(
      { correlationId, method: req.method, path: req.path },
      "Incoming request",
    );

    req.logger = logger;
    
    next();
  });
};
