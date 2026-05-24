import type { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { sendSuccess } from "../../../shared/utils/api-response";
import { userService } from "../services/user.service";
import type { UpdateUserPermissionsInput } from "../validations/user.validation";

export const userController = {
  async list(_req: Request, res: Response) {
    const data = await userService.list();
    return sendSuccess(res, data, "Users fetched successfully.");
  },

  async updatePermissions(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "User ID is invalid.");
    }

    const data = await userService.updatePermissions(
      id,
      req.body as UpdateUserPermissionsInput,
      req.user!,
    );
    return sendSuccess(res, data, "User permissions updated successfully.");
  },
};
