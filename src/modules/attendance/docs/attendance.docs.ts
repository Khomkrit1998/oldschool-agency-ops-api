import "../schemas/attendance.schema";

/**
 * @openapi
 * /api/v1/attendance/work-modes:
 *   get:
 *     summary: List active work modes
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Work modes fetched successfully.
 *
 * /api/v1/attendance/me:
 *   get:
 *     summary: Get my attendance
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance fetched successfully.
 *       404:
 *         description: Employee profile for this user was not found.
 *
 * /api/v1/attendance/check-ins:
 *   get:
 *     summary: List attendance check-ins
 *     description: Returns the latest attendance check-ins for HR/Admin reporting. Requires attendance:read:all.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by business date.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search employee name, email, code, work mode, location, or note.
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         description: Filter by employee team.
 *     responses:
 *       200:
 *         description: Attendance check-ins fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Attendance check-ins fetched successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     checkIns:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/AttendanceCheckIn'
 *       403:
 *         description: Missing attendance:read:all permission.
 *   post:
 *     summary: Check in for today
 *     description: Creates one attendance check-in for the authenticated employee using server time.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAttendanceCheckInRequest'
 *     responses:
 *       201:
 *         description: Checked in successfully.
 *       400:
 *         description: Validation failed.
 *       404:
 *         description: Employee profile or work mode was not found.
 *       409:
 *         description: Employee has already checked in today.
 */
export {};
