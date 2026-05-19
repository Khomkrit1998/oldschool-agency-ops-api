/**
 * @openapi
 * components:
 *   schemas:
 *     ProbationNoteInput:
 *       type: object
 *       properties:
 *         note:
 *           type: string
 *           example: "Review communication quality and delivery ownership."
 *     CreateEmployeeRequest:
 *       type: object
 *       required:
 *         - name
 *         - nickname
 *         - email
 *         - phone
 *         - position
 *         - team
 *         - manager
 *         - startDate
 *         - employmentType
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           example: "Maya Chen"
 *         nickname:
 *           type: string
 *           example: "May"
 *         email:
 *           type: string
 *           format: email
 *           example: "maya@oldschool.agency"
 *         phone:
 *           type: string
 *           example: "+66 81 234 5678"
 *         position:
 *           type: string
 *           example: "Strategy Lead"
 *         team:
 *           type: string
 *           example: "Strategy"
 *         manager:
 *           type: string
 *           example: "Nora Bailey"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2026-05-19"
 *         employmentType:
 *           type: string
 *           enum: [Full-time, Part-time, Contract]
 *           example: "Full-time"
 *         location:
 *           type: string
 *           example: "Bangkok"
 *         probation:
 *           type: object
 *           properties:
 *             day30:
 *               $ref: '#/components/schemas/ProbationNoteInput'
 *             day60:
 *               $ref: '#/components/schemas/ProbationNoteInput'
 *             day90:
 *               $ref: '#/components/schemas/ProbationNoteInput'
 *     EmployeeProbationReview:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [ผ่าน, รอดำเนินการ, ต้องรีวิว, ไม่ผ่าน]
 *           example: "รอดำเนินการ"
 *         score:
 *           type: integer
 *           nullable: true
 *           example: null
 *         reviewDate:
 *           type: string
 *           format: date
 *           example: "2026-06-18"
 *         note:
 *           type: string
 *           example: "Review communication quality and delivery ownership."
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6b17f1b5-2d5f-41db-a0be-62e5df45ddaa"
 *         name:
 *           type: string
 *           example: "Maya Chen"
 *         nickname:
 *           type: string
 *           example: "May"
 *         email:
 *           type: string
 *           format: email
 *           example: "maya@oldschool.agency"
 *         phone:
 *           type: string
 *           example: "+66 81 234 5678"
 *         employeeCode:
 *           type: string
 *           example: "OA-STR-001"
 *         position:
 *           type: string
 *           example: "Strategy Lead"
 *         team:
 *           type: string
 *           example: "Strategy"
 *         manager:
 *           type: string
 *           example: "Nora Bailey"
 *         status:
 *           type: string
 *           enum: [ใช้งาน, ทดลองงาน, ลา, ไม่ใช้งาน]
 *           example: "ทดลองงาน"
 *         employmentType:
 *           type: string
 *           enum: [Full-time, Part-time, Contract]
 *           example: "Full-time"
 *         utilization:
 *           type: integer
 *           example: 0
 *         location:
 *           type: string
 *           example: "Bangkok"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2026-05-19"
 *         lastCheckIn:
 *           type: string
 *           nullable: true
 *           example: null
 *         probation:
 *           type: object
 *           properties:
 *             day30:
 *               $ref: '#/components/schemas/EmployeeProbationReview'
 *             day60:
 *               $ref: '#/components/schemas/EmployeeProbationReview'
 *             day90:
 *               $ref: '#/components/schemas/EmployeeProbationReview'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateEmployeeResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *     EmployeeResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *     EmployeesResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *     EmployeeSummary:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 42
 *         active:
 *           type: integer
 *           example: 36
 *         probation:
 *           type: integer
 *           example: 4
 *         leave:
 *           type: integer
 *           example: 1
 *         inactive:
 *           type: integer
 *           example: 1
 *         averageUtilization:
 *           type: integer
 *           example: 74
 *         needsReview:
 *           type: integer
 *           example: 5
 *     EmployeeSummaryResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 summary:
 *                   $ref: '#/components/schemas/EmployeeSummary'
 *     EmployeeTeamCapacity:
 *       type: object
 *       properties:
 *         team:
 *           type: string
 *           example: "Strategy"
 *         employeeCount:
 *           type: integer
 *           example: 8
 *         averageUtilization:
 *           type: integer
 *           example: 76
 *     EmployeeCapacityResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeTeamCapacity'
 *     EmployeeActionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "employee-id-30"
 *         title:
 *           type: string
 *           example: "รีวิวทดลองงาน 30 วัน"
 *         employeeId:
 *           type: string
 *           example: "6b17f1b5-2d5f-41db-a0be-62e5df45ddaa"
 *         employeeName:
 *           type: string
 *           example: "Maya Chen"
 *         employeeCode:
 *           type: string
 *           example: "OA-STR-001"
 *         team:
 *           type: string
 *           example: "Strategy"
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2026-06-18"
 *         status:
 *           type: string
 *           enum: [รอดำเนินการ, ต้องรีวิว]
 *           example: "รอดำเนินการ"
 *         priority:
 *           type: string
 *           enum: [normal, high]
 *           example: "normal"
 *     EmployeeActionItemsResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeActionItem'
 *     EmployeeActivity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "employee-id-created"
 *         title:
 *           type: string
 *           example: "เพิ่มพนักงานใหม่"
 *         description:
 *           type: string
 *           example: "Maya Chen ถูกเพิ่มเข้า Strategy"
 *         employeeId:
 *           type: string
 *           example: "6b17f1b5-2d5f-41db-a0be-62e5df45ddaa"
 *         employeeName:
 *           type: string
 *           example: "Maya Chen"
 *         employeeCode:
 *           type: string
 *           example: "OA-STR-001"
 *         type:
 *           type: string
 *           enum: [created, probation]
 *           example: "created"
 *         occurredAt:
 *           type: string
 *           format: date-time
 *     EmployeeActivityResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 activities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmployeeActivity'
 */
export {};
