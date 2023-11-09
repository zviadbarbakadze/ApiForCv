import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../interfaces/express";
import { UserRole } from "../models/user.model";
interface AuthenticatedUser {
  dataValues: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    title: string;
    summary: string;
    role: UserRole;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export const roles = (allowedRoles: UserRole[]) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const user = req.user as AuthenticatedUser;
    req.logger.info("here should log role", user.dataValues.role);
    if (!user || !user.dataValues.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.dataValues.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
