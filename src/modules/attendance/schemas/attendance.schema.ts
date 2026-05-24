/**
 * @openapi
 * components:
 *   schemas:
 *     WorkMode:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Remote
 *     AttendanceEmployee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Maya Chen
 *         employeeCode:
 *           type: string
 *           example: OA-STR-001
 *         team:
 *           type: string
 *           nullable: true
 *           example: Operations
 *     AttendanceCheckIn:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *           example: "2026-05-23"
 *         workMode:
 *           $ref: '#/components/schemas/WorkMode'
 *         checkInAt:
 *           type: string
 *           format: date-time
 *         note:
 *           type: string
 *         location:
 *           type: string
 *           example: Bangkok Office
 *         employee:
 *           $ref: '#/components/schemas/AttendanceEmployee'
 *     CreateAttendanceCheckInRequest:
 *       type: object
 *       required: [workModeId, location]
 *       properties:
 *         workModeId:
 *           type: string
 *           format: uuid
 *         location:
 *           type: string
 *           example: Bangkok Office
 *         note:
 *           type: string
 *           example: Optional note
 */
export {};
