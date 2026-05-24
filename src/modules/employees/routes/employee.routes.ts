import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { authorize } from "../../../shared/middlewares/authorize";
import { validateRequest } from "../../../shared/middlewares/validate-request";
import { permissions } from "../../../shared/permissions";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { employeeController } from "../controllers/employee.controller";
import {
  createEmployeeValidation,
  listEmployeesValidation,
  updateEmployeeProbationReviewValidation,
  updateEmployeeValidation,
} from "../validations/employee.validation";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize([], [permissions.employeesRead]),
  validateRequest(listEmployeesValidation),
  asyncHandler(employeeController.list),
);

router.get(
  "/summary",
  authenticate,
  authorize([], [permissions.employeesRead]),
  asyncHandler(employeeController.summary),
);

router.get(
  "/capacity-by-team",
  authenticate,
  authorize([], [permissions.employeesRead]),
  asyncHandler(employeeController.capacityByTeam),
);

router.get(
  "/action-items",
  authenticate,
  authorize([], [permissions.employeesRead]),
  asyncHandler(employeeController.actionItems),
);

router.get(
  "/activity",
  authenticate,
  authorize([], [permissions.employeesRead]),
  asyncHandler(employeeController.activity),
);

router.get(
  "/:id",
  authenticate,
  authorize([], [permissions.employeesRead]),
  asyncHandler(employeeController.getById),
);

router.post(
  "/",
  authenticate,
  authorize([], [permissions.employeesCreate]),
  validateRequest(createEmployeeValidation),
  asyncHandler(employeeController.create),
);

router.patch(
  "/:id",
  authenticate,
  authorize([], [permissions.employeesUpdate]),
  validateRequest(updateEmployeeValidation),
  asyncHandler(employeeController.update),
);

router.patch(
  "/:id/probation/:checkpoint",
  authenticate,
  authorize([], [permissions.employeesUpdate]),
  validateRequest(updateEmployeeProbationReviewValidation),
  asyncHandler(employeeController.updateProbationReview),
);

export default router;
