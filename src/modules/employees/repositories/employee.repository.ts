import { prisma } from "../../../database/prisma";
import type { Prisma } from "@prisma/client";

export type CreateEmployeeData = Parameters<typeof prisma.employee.create>[0]["data"];
export type UpdateEmployeeData = Parameters<typeof prisma.employee.update>[0]["data"];
export type UpdateProbationReviewData = Parameters<typeof prisma.employeeProbationReview.update>[0]["data"];

export const employeeRepository = {
  findMany(where: Prisma.EmployeeWhereInput = {}) {
    return prisma.employee.findMany({
      where: {
        ...where,
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

  update(id: string, data: UpdateEmployeeData) {
    return prisma.employee.update({
      where: {
        id,
      },
      data,
      include: {
        probationReviews: {
          orderBy: { checkpoint: "asc" },
        },
      },
    });
  },

  updateProbationReview(employeeId: string, checkpoint: number, data: UpdateProbationReviewData) {
    return prisma.employeeProbationReview.update({
      where: {
        employeeId_checkpoint: {
          employeeId,
          checkpoint,
        },
      },
      data,
      include: {
        employee: {
          include: {
            probationReviews: {
              orderBy: { checkpoint: "asc" },
            },
          },
        },
      },
    });
  },
};
