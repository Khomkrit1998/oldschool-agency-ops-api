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
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export {};
