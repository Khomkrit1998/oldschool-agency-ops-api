import type { Role } from "@prisma/client";
import { prisma } from "../../../database/prisma";

type UserUpdateData = Parameters<typeof prisma.user.update>[0]["data"];

export type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
  role?: Role;
  permissions?: string[];
};

export const userRepository = {
  findMany() {
    return prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: [
        { role: "asc" },
        { name: "asc" },
      ],
    });
  },

  findByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        deletedAt: null,
      },
    });
  },

  findById(id: string) {
    return prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  },

  create(data: CreateUserData) {
    return prisma.user.create({
      data,
    });
  },

  update(id: string, data: UserUpdateData) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  softDelete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
};
