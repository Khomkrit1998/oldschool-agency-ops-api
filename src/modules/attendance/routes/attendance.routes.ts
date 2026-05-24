import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { authorize } from "../../../shared/middlewares/authorize";
import { validateRequest } from "../../../shared/middlewares/validate-request";
import { permissions } from "../../../shared/permissions";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { attendanceController } from "../controllers/attendance.controller";
import { createAttendanceCheckInValidation, listAttendanceCheckInsValidation } from "../validations/attendance.validation";

const router = Router();

router.get(
  "/work-modes",
  authenticate,
  asyncHandler(attendanceController.workModes),
);

router.get(
  "/me",
  authenticate,
  authorize([], [permissions.attendanceReadSelf]),
  asyncHandler(attendanceController.me),
);

router.get(
  "/check-ins",
  authenticate,
  authorize([], [permissions.attendanceReadAll]),
  validateRequest(listAttendanceCheckInsValidation),
  asyncHandler(attendanceController.list),
);

router.post(
  "/check-ins",
  authenticate,
  authorize([], [permissions.attendanceCheckIn]),
  validateRequest(createAttendanceCheckInValidation),
  asyncHandler(attendanceController.checkIn),
);

export default router;
