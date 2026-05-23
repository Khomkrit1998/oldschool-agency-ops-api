import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { validateRequest } from "../../../shared/middlewares/validate-request";
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
  validateRequest(listEmployeesValidation),
  asyncHandler(employeeController.list),
);

router.get(
  "/summary",
  authenticate,
  asyncHandler(employeeController.summary),
);

router.get(
  "/capacity-by-team",
  authenticate,
  asyncHandler(employeeController.capacityByTeam),
);

router.get(
  "/action-items",
  authenticate,
  asyncHandler(employeeController.actionItems),
);

router.get(
  "/activity",
  authenticate,
  asyncHandler(employeeController.activity),
);

router.get(
  "/:id",
  authenticate,
  asyncHandler(employeeController.getById),
);

router.post(
  "/",
  authenticate,
  validateRequest(createEmployeeValidation),
  asyncHandler(employeeController.create),
);

router.patch(
  "/:id",
  authenticate,
  validateRequest(updateEmployeeValidation),
  asyncHandler(employeeController.update),
);

router.patch(
  "/:id/probation/:checkpoint",
  authenticate,
  validateRequest(updateEmployeeProbationReviewValidation),
  asyncHandler(employeeController.updateProbationReview),
);

export default router;
