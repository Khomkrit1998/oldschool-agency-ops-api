import { Router } from "express";
import authRoutes from "../modules/auth/routes/auth.routes";
import employeeRoutes from "../modules/employees/routes/employee.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);

export default router;
