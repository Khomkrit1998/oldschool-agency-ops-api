import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { AppError } from "../errors/app-error";

export function authorize(roles: Role[] = [], permissions: string[] = []) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Authentication is required."));
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return next(new AppError(403, "You do not have permission to access this resource."));
    }

    const userPermissions = Array.isArray(req.user.permissions) ? req.user.permissions : [];
    const hasRequiredPermissions = permissions.every((permission) => userPermissions.includes(permission));

    if (permissions.length > 0 && !hasRequiredPermissions) {
      return next(new AppError(403, "You do not have permission to access this resource."));
    }

    return next();
  };
}
