import type { Response } from "express";
import type { ApiSuccessResponse } from "../types/api-response";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200,
) {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(payload);
}
