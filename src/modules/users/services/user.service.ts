import type { Role, User } from "@prisma/client";
import { userRepository } from "../repositories/user.repository";

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
    permissions: user.permissions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export const userService = {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    return user ? toSafeUser(user) : null;
  },
};
