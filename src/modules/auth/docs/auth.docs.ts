import "../schemas/auth.schema";
import "../../users/schemas/user.schema";

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication, token lifecycle, and current user endpoints.
 *
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a user, hashes the password, and returns an access token plus refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           examples:
 *             valid:
 *               value:
 *                 name: "Test User"
 *                 email: "test@example.com"
 *                 password: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email already exists.
 *
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with email and password
 *     description: Validates credentials and returns a new token pair.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             valid:
 *               value:
 *                 email: "test@example.com"
 *                 password: "password123"
 *     responses:
 *       200:
 *         description: Logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials.
 *
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Rotate refresh token
 *     description: Revokes the submitted refresh token and returns a fresh token pair.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Refresh token is invalid or expired.
 *
 * /api/v1/auth/me:
 *   get:
 *     summary: Get authenticated user
 *     description: Returns the current user from the validated JWT access token.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user fetched successfully.
 *       401:
 *         description: Access token is missing, invalid, or expired.
 *
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Revokes the provided refresh token when supplied.
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Logged out successfully.
 */
export {};
