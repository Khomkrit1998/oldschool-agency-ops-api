import type { Request, Response } from "express";
import { sendSuccess } from "../../../shared/utils/api-response";
import { attendanceService } from "../services/attendance.service";
import type { CreateAttendanceCheckInInput, ListAttendanceCheckInsQuery } from "../validations/attendance.validation";

export const attendanceController = {
  async workModes(_req: Request, res: Response) {
    const data = await attendanceService.workModes();
    return sendSuccess(res, data, "Work modes fetched successfully.");
  },

  async list(req: Request, res: Response) {
    const data = await attendanceService.list(req.query as ListAttendanceCheckInsQuery);
    return sendSuccess(res, data, "Attendance check-ins fetched successfully.");
  },

  async me(req: Request, res: Response) {
    const data = await attendanceService.me(req.user!);
    return sendSuccess(res, data, "Attendance fetched successfully.");
  },

  async checkIn(req: Request<unknown, unknown, CreateAttendanceCheckInInput>, res: Response) {
    const data = await attendanceService.checkIn(req.user!, req.body);
    return sendSuccess(res, data, "Checked in successfully.", 201);
  },
};
