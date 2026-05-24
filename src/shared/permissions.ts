export const permissions = {
  attendanceCheckIn: "attendance:check-in",
  attendanceReadSelf: "attendance:read:self",
  attendanceReadAll: "attendance:read:all",
  employeesRead: "employees:read",
  employeesCreate: "employees:create",
  employeesUpdate: "employees:update",
  usersRead: "users:read",
  usersManagePermissions: "users:manage-permissions",
} as const;

export const permissionCatalog = Object.values(permissions);

export type Permission = (typeof permissionCatalog)[number];

export const defaultUserPermissions: Permission[] = [
  permissions.attendanceCheckIn,
  permissions.attendanceReadSelf,
];

export function isPermission(value: unknown): value is Permission {
  return typeof value === "string" && permissionCatalog.includes(value as Permission);
}

export function normalizePermissions(value: unknown): Permission[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isPermission);
}
