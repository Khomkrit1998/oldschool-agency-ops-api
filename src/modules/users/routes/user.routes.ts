import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { authorize } from "../../../shared/middlewares/authorize";
import { validateRequest } from "../../../shared/middlewares/validate-request";
import { permissions } from "../../../shared/permissions";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { userController } from "../controllers/user.controller";
import { updateUserPermissionsValidation } from "../validations/user.validation";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize([], [permissions.usersRead]),
  asyncHandler(userController.list),
);

router.patch(
  "/:id/permissions",
  authenticate,
  authorize([], [permissions.usersManagePermissions]),
  validateRequest(updateUserPermissionsValidation),
  asyncHandler(userController.updatePermissions),
);

export default router;
