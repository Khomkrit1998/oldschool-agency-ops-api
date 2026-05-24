import "../schemas/user.schema";

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User directory and permission management endpoints.
 *
 * /api/v1/users:
 *   get:
 *     summary: List users
 *     description: Returns active users for Settings > Users. Requires `users:read`; ADMIN bypasses permission checks.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersResponse'
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *       403:
 *         description: User does not have `users:read`.
 *
 * /api/v1/users/{id}/permissions:
 *   patch:
 *     summary: Update user permissions
 *     description: Replaces a user's permission list. Requires `users:manage-permissions`; ADMIN bypasses permission checks.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserPermissionsRequest'
 *           examples:
 *             employeeManager:
 *               value:
 *                 permissions:
 *                   - attendance:check-in
 *                   - attendance:read:self
 *                   - employees:read
 *                   - employees:create
 *             attendanceReporter:
 *               value:
 *                 permissions:
 *                   - attendance:check-in
 *                   - attendance:read:self
 *                   - attendance:read:all
 *     responses:
 *       200:
 *         description: User permissions updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation failed, invalid permission, or self-removal of permission management access.
 *       401:
 *         description: Authentication token is missing, invalid, or expired.
 *       403:
 *         description: User does not have `users:manage-permissions`.
 *       404:
 *         description: User not found.
 */
export {};
