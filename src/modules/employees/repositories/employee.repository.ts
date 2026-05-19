import { prisma } from "../../../database/prisma";

export type CreateEmployeeData = Parameters<typeof prisma.employee.create>[0]["data"];

export const employeeRepository = {
  findMany() {
    return prisma.employee.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        probationReviews: {
          orderBy: { checkpoint: "asc" },
        },
      },
    });
  },

  findByEmail(email: string) {
    return prisma.employee.findFirst({
      where: {
        email: email.toLowerCase(),
        deletedAt: null,
      },
    });
  },

  findById(id: string) {
    return prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        probationReviews: {
          orderBy: { checkpoint: "asc" },
        },
      },
    });
  },

  findLatestByEmployeeCodePrefix(prefix: string) {
    return prisma.employee.findFirst({
      where: {
        employeeCode: {
          startsWith: prefix,
        },
      },
      orderBy: {
        employeeCode: "desc",
      },
    });
  },

  create(data: CreateEmployeeData) {
    return prisma.employee.create({
      data,
      include: {
        probationReviews: {
          orderBy: { checkpoint: "asc" },
        },
      },
    });
  },
};
