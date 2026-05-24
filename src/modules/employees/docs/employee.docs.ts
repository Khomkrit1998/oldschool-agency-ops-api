import "../schemas/employee.schema";

/**
 * @openapi
 * tags:
 *   - name: Employees
 *     description: Employee profile, work information, and probation workflow endpoints.
 *
 * /api/v1/employees:
 *   get:
 *     summary: List employees
 *     description: Returns employees with work info and probation review checkpoints.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, nickname, email, phone, employee code, position, team, or manager.
 *       - in: query
 *         name: team
 *         schema:
 *           type: string
 *         description: Filter by team.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ใช้งาน, ทดลองงาน, ลา, ไม่ใช้งาน]
 *         description: Filter by employee status.
 *       - in: query
 *         name: employmentType
 *         schema:
 *           type: string
 *           enum: [Full-time, Part-time, Contract]
 *         description: Filter by employment type.
 *     responses:
 *       200:
 *         description: Employees fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeesResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *
 *   post:
 *     summary: Create employee
 *     description: Creates an employee profile and automatically creates 30/60/90 day probation review checkpoints from the start date.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeRequest'
 *           examples:
 *             valid:
 *               value:
 *                 name: "Maya Chen"
 *                 nickname: "May"
 *                 email: "maya@oldschool.agency"
 *                 phone: "+66 81 234 5678"
 *                 position: "Strategy Lead"
 *                 team: "Strategy"
 *                 manager: "Nora Bailey"
 *                 startDate: "2026-05-19"
 *                 employmentType: "Full-time"
 *                 location: "Bangkok"
 *                 probation:
 *                   day30:
 *                     note: "Review communication quality and delivery ownership."
 *                   day60:
 *                     note: "Review client-facing readiness."
 *                   day90:
 *                     note: "Final confirmation checkpoint."
 *                 auth:
 *                   createAccount: true
 *                   temporaryPassword: "Welcome123!"
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEmployeeResponse'
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *       409:
 *         description: Employee email or employee code is already in use.
 *
 * /api/v1/employees/summary:
 *   get:
 *     summary: Get employee summary
 *     description: Returns employee counts and high-level HR metrics for KPI cards.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee summary fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeSummaryResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *
 * /api/v1/employees/capacity-by-team:
 *   get:
 *     summary: Get employee capacity by team
 *     description: Returns employee count and average utilization grouped by team.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee capacity fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeCapacityResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *
 * /api/v1/employees/action-items:
 *   get:
 *     summary: Get employee action items
 *     description: Returns upcoming probation review tasks and review items that need attention.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee action items fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeActionItemsResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *
 * /api/v1/employees/activity:
 *   get:
 *     summary: Get employee activity
 *     description: Returns recent employee activity derived from employee records until a full audit log is introduced.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee activity fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeActivityResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     description: Returns one employee profile with basic info, work info, and probation checkpoints.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID.
 *     responses:
 *       200:
 *         description: Employee fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *       404:
 *         description: Employee not found.
 *
 *   patch:
 *     summary: Update employee
 *     description: Updates employee profile, work information, status, utilization, or check-in metadata.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeeRequest'
 *     responses:
 *       200:
 *         description: Employee updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResponse'
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *       404:
 *         description: Employee not found.
 *       409:
 *         description: Employee email is already in use.
 *
 * /api/v1/employees/{id}/probation/{checkpoint}:
 *   patch:
 *     summary: Update employee probation review
 *     description: Updates one probation checkpoint review for 30, 60, or 90 days.
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID.
 *       - in: path
 *         name: checkpoint
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [30, 60, 90]
 *         description: Probation checkpoint day.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeeProbationReviewRequest'
 *     responses:
 *       200:
 *         description: Employee probation review updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeResponse'
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *       404:
 *         description: Employee not found.
 */
export {};
