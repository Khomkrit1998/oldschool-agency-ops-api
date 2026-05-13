import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { userService } from "../../modules/users/services/user.service";
import { verifyAccessToken } from "../../modules/auth/utils/token.util";

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.get("authorization") || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(401, "Authentication token is required.");
    }

    const payload = verifyAccessToken(token);
    const user = await userService.getById(payload.sub);

    if (!user) {
      throw new AppError(401, "User no longer exists.");
    }

    req.auth = payload;
    req.user = user;

    return next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    return next(new AppError(401, "Authentication token is invalid or expired."));
  }
}
