import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { AppError } from "../errors/app-error";
import { normalizePermissions, type Permission } from "../permissions";

export function authorize(roles: Role[] = [], permissions: Permission[] = []) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "Authentication is required."));
    }

    if (req.user.role === "ADMIN") {
      return next();
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return next(new AppError(403, "You do not have permission to access this resource."));
    }

    const userPermissions = normalizePermissions(req.user.permissions);
    const hasRequiredPermissions = permissions.every((permission) => userPermissions.includes(permission));

    if (permissions.length > 0 && !hasRequiredPermissions) {
      return next(new AppError(403, "You do not have permission to access this resource."));
    }

    return next();
  };
}
