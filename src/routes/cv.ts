import { Context, RouterFactory } from "../interfaces/general";
import express, { NextFunction, Response } from "express";
import { ExtendedRequest } from "../interfaces/express";
import { check } from "express-validator";
import { handleValidationResults } from "../middleware/validators";

export const makeCv: RouterFactory = (context: Context) => {
  const router = express.Router();
  router.get(
    "/:userId/cv",
    check("userId").isInt().toInt().escape().withMessage("validation failed"),
    handleValidationResults,

    async (
      request: ExtendedRequest,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const cacheKey = request.params.userId;

        const cachedData = await context.services.cacheService.get(cacheKey);
        console.log(cachedData);
        if (cachedData) {
          response.status(200).send(JSON.parse(cachedData));
        } else {
          const id = request.params.userId;
          const userId = Number(id);

          const getCv = await context.services.cvService.getCv(
            userId,
            response
          );

          if (getCv) {
            await context.services.cacheService.setex(
              cacheKey,
              5,
              JSON.stringify(getCv)
            );

            response.status(200).json(getCv);
          }
        }
      } catch (error) {
        next(error);
      }
    }
  );
  return router;
};
