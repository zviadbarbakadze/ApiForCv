import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../interfaces/express";
import { Loader } from "../interfaces/general";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: Loader = (app, _context) => {
  app.use(
    (err: Error, req: ExtendedRequest, res: Response, next: NextFunction) => {
      req.logger.error({
        message: "this is error handler message",
        correlationId: req.id,
      });

      res.status(500).json({ error: "Something went wrong to the server" });

      next(err);
    }
  );
};
