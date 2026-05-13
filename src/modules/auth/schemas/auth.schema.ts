/**
 * @openapi
 * components:
 *   schemas:
 *     AuthTokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refreshToken:
 *           type: string
 *           example: "z6QPG8lZaN7SIswI3iZ4..."
 *         refreshTokenExpiresAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-10T14:35:00.000Z"
 *     AuthResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 refreshTokenExpiresAt:
 *                   type: string
 *                   format: date-time
 *     RegisterRequest:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name:
 *           type: string
 *           example: "Test User"
 *         email:
 *           type: string
 *           format: email
 *           example: "test@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "test@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "password123"
 *     RefreshTokenRequest:
 *       type: object
 *       required: [refreshToken]
 *       properties:
 *         refreshToken:
 *           type: string
 */
export {};
