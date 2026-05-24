import { Router } from "express";
import attendanceRoutes from "../modules/attendance/routes/attendance.routes";
import authRoutes from "../modules/auth/routes/auth.routes";
import employeeRoutes from "../modules/employees/routes/employee.routes";
import userRoutes from "../modules/users/routes/user.routes";

const router = Router();

router.use("/attendance", attendanceRoutes);
router.use("/auth", authRoutes);
router.use("/employees", employeeRoutes);
router.use("/users", userRoutes);

export default router;
