import type { Prisma } from "@prisma/client";
import { prisma } from "../../../database/prisma";

export type CreateAttendanceCheckInData = Parameters<typeof prisma.attendanceCheckIn.create>[0]["data"];

const attendanceInclude = {
  employee: {
    select: {
      id: true,
      name: true,
      employeeCode: true,
      team: true,
    },
  },
  workMode: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.AttendanceCheckInInclude;

export const attendanceRepository = {
  findActiveWorkModes() {
    return prisma.workMode.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" },
      ],
    });
  },

  findActiveWorkModeById(id: string) {
    return prisma.workMode.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  },

  findEmployeeForUserEmail(email: string) {
    return prisma.employee.findFirst({
      where: {
        email: email.toLowerCase(),
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        employeeCode: true,
      },
    });
  },

  findTodayByEmployee(employeeId: string, date: Date) {
    return prisma.attendanceCheckIn.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date,
        },
      },
      include: attendanceInclude,
    });
  },

  findRecentByEmployee(employeeId: string, take = 7) {
    return prisma.attendanceCheckIn.findMany({
      where: {
        employeeId,
      },
      orderBy: {
        checkInAt: "desc",
      },
      take,
      include: attendanceInclude,
    });
  },

  findMany(where: Prisma.AttendanceCheckInWhereInput = {}, take = 100) {
    return prisma.attendanceCheckIn.findMany({
      where,
      orderBy: {
        checkInAt: "desc",
      },
      take,
      include: attendanceInclude,
    });
  },

  createCheckIn(data: CreateAttendanceCheckInData) {
    return prisma.attendanceCheckIn.create({
      data,
      include: attendanceInclude,
    });
  },

  updateEmployeeLastCheckIn(employeeId: string, lastCheckIn: string) {
    return prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        lastCheckIn,
      },
    });
  },
};
