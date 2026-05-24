import type { Role, User } from "@prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { normalizePermissions, permissions, type Permission } from "../../../shared/permissions";
import { userRepository } from "../repositories/user.repository";
import type { UpdateUserPermissionsInput } from "../validations/user.validation";

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: normalizePermissions(user.permissions),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export const userService = {
  async list() {
    const users = await userRepository.findMany();

    return {
      users: users.map(toSafeUser),
    };
  },

  async getById(id: string) {
    const user = await userRepository.findById(id);
    return user ? toSafeUser(user) : null;
  },

  async updatePermissions(id: string, input: UpdateUserPermissionsInput, currentUser: SafeUser) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    const nextPermissions = input.permissions as Permission[];

    if (
      id === currentUser.id
      && normalizePermissions(currentUser.permissions).includes(permissions.usersManagePermissions)
      && !nextPermissions.includes(permissions.usersManagePermissions)
    ) {
      throw new AppError(400, "You cannot remove your own permission management access.");
    }

    const updatedUser = await userRepository.update(id, {
      permissions: nextPermissions,
    });

    return {
      user: toSafeUser(updatedUser),
    };
  },
};
