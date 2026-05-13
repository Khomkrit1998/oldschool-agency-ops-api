import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/authenticate";
import { authRateLimiter } from "../../../shared/middlewares/rate-limit";
import { validateRequest } from "../../../shared/middlewares/validate-request";
import { asyncHandler } from "../../../shared/utils/async-handler";
import { authController } from "../controllers/auth.controller";
import {
  loginValidation,
  refreshTokenValidation,
  registerValidation,
  updateProfileValidation,
} from "../validations/auth.validation";

const router = Router();

router.post(
  "/register",
  authRateLimiter,
  validateRequest(registerValidation),
  asyncHandler(authController.register),
);
router.post("/login", authRateLimiter, validateRequest(loginValidation), asyncHandler(authController.login));
router.post(
  "/refresh-token",
  authRateLimiter,
  validateRequest(refreshTokenValidation),
  asyncHandler(authController.refresh),
);
router.get("/me", authenticate, asyncHandler(authController.me));
router.patch(
  "/me",
  authenticate,
  validateRequest(updateProfileValidation),
  asyncHandler(authController.updateProfile),
);
router.post("/logout", asyncHandler(authController.logout));

export default router;
