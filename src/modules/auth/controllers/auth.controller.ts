import type { Request, Response } from "express";
import { sendSuccess } from "../../../shared/utils/api-response";
import { authService } from "../services/auth.service";
import type {
  LoginInput,
  RefreshTokenInput,
  RegisterInput,
  UpdateProfileInput,
} from "../validations/auth.validation";

export const authController = {
  async register(req: Request<unknown, unknown, RegisterInput>, res: Response) {
    const data = await authService.register(req.body);
    return sendSuccess(res, data, "User registered successfully.", 201);
  },

  async login(req: Request<unknown, unknown, LoginInput>, res: Response) {
    const data = await authService.login(req.body);
    return sendSuccess(res, data, "Logged in successfully.");
  },

  async refresh(req: Request<unknown, unknown, RefreshTokenInput>, res: Response) {
    const data = await authService.refresh(req.body.refreshToken);
    return sendSuccess(res, data, "Token refreshed successfully.");
  },

  async me(req: Request, res: Response) {
    return sendSuccess(res, { user: req.user }, "Authenticated user fetched successfully.");
  },

  async updateProfile(req: Request<unknown, unknown, UpdateProfileInput>, res: Response) {
    const data = await authService.updateProfile(req.user!.id, req.body);
    return sendSuccess(res, data, "Profile updated successfully.");
  },

  async logout(req: Request<unknown, unknown, Partial<RefreshTokenInput>>, res: Response) {
    await authService.logout(req.body.refreshToken);
    return sendSuccess(res, null, "Logged out successfully.");
  },
};
