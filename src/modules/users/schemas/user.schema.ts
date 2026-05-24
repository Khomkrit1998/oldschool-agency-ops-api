/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "6b17f1b5-2d5f-41db-a0be-62e5df45ddaa"
 *         name:
 *           type: string
 *           example: "Test User"
 *         email:
 *           type: string
 *           format: email
 *           example: "test@example.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *           example: "USER"
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - attendance:check-in
 *               - attendance:read:self
 *               - attendance:read:all
 *               - employees:read
 *               - employees:create
 *               - employees:update
 *               - users:read
 *               - users:manage-permissions
 *           example: ["attendance:check-in", "attendance:read:self"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     UpdateUserPermissionsRequest:
 *       type: object
 *       required:
 *         - permissions
 *       properties:
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - attendance:check-in
 *               - attendance:read:self
 *               - attendance:read:all
 *               - employees:read
 *               - employees:create
 *               - employees:update
 *               - users:read
 *               - users:manage-permissions
 *           example: ["employees:read", "attendance:read:all"]
 *     UsersResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *     UserResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
export {};
