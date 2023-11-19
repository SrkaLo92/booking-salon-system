import { Request, Response, NextFunction } from 'express';
import { JwtToken } from "../../interfaces/Express";
import { UserRole } from "@prisma/client";

const roleCheck = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtToken;

    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: "You don't have permission for this action" });
    }
  };
};

export default roleCheck;
