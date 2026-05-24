import type { SafeUser } from "../../users/services/user.service";
import type { Prisma } from "@prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { attendanceRepository } from "../repositories/attendance.repository";
import type { CreateAttendanceCheckInInput, ListAttendanceCheckInsQuery } from "../validations/attendance.validation";

const businessTimeZone = "Asia/Bangkok";

function getBusinessDateString(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: businessTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parseDateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function formatCheckInTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: businessTimeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function toDateOnlyString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toSafeAttendance(
  attendance: Awaited<ReturnType<typeof attendanceRepository.findTodayByEmployee>>,
) {
  if (!attendance) {
    return null;
  }

  return {
    id: attendance.id,
    date: toDateOnlyString(attendance.date),
    workMode: attendance.workMode,
    checkInAt: attendance.checkInAt.toISOString(),
    note: attendance.note ?? "",
    location: attendance.location,
    employee: attendance.employee,
    createdAt: attendance.createdAt.toISOString(),
    updatedAt: attendance.updatedAt.toISOString(),
  };
}

async function getEmployeeForUser(user: SafeUser) {
  const employee = await attendanceRepository.findEmployeeForUserEmail(user.email);

  if (!employee) {
    throw new AppError(404, "Employee profile for this user was not found.");
  }

  return employee;
}

function toSafeEmployee(employee: Awaited<ReturnType<typeof attendanceRepository.findEmployeeForUserEmail>>) {
  if (!employee) {
    return null;
  }

  return employee;
}

export const attendanceService = {
  async workModes() {
    const workModes = await attendanceRepository.findActiveWorkModes();

    return {
      workModes: workModes.map((workMode: { id: any; name: any; }) => ({
        id: workMode.id,
        name: workMode.name,
      })),
    };
  },

  async list(query: ListAttendanceCheckInsQuery = {}) {
    const where: Prisma.AttendanceCheckInWhereInput = {};
    const search = query.search?.trim();

    if (query.date) {
      where.date = parseDateOnly(query.date);
    }

    if (query.team) {
      where.employee = { is: { team: query.team } };
    }

    if (search) {
      where.OR = [
        { location: { contains: search } },
        { note: { contains: search } },
        { employee: { name: { contains: search } } },
        { employee: { email: { contains: search } } },
        { employee: { employeeCode: { contains: search } } },
        { workMode: { name: { contains: search } } },
      ];
    }

    const checkIns = await attendanceRepository.findMany(where);

    return {
      checkIns: checkIns.map(toSafeAttendance).filter(Boolean),
    };
  },

  async me(user: SafeUser) {
    const employee = await attendanceRepository.findEmployeeForUserEmail(user.email);

    if (!employee) {
      return {
        employee: null,
        today: null,
        recent: [],
      };
    }

    const todayDate = parseDateOnly(getBusinessDateString(new Date()));
    const [today, recent] = await Promise.all([
      attendanceRepository.findTodayByEmployee(employee.id, todayDate),
      attendanceRepository.findRecentByEmployee(employee.id),
    ]);

    return {
      employee: toSafeEmployee(employee),
      today: toSafeAttendance(today),
      recent: recent.map(toSafeAttendance).filter(Boolean),
    };
  },

  async checkIn(user: SafeUser, input: CreateAttendanceCheckInInput) {
    const employee = await getEmployeeForUser(user);
    const workMode = await attendanceRepository.findActiveWorkModeById(input.workModeId);

    if (!workMode) {
      throw new AppError(404, "Work mode not found.");
    }

    const now = new Date();
    const todayDate = parseDateOnly(getBusinessDateString(now));
    const existingCheckIn = await attendanceRepository.findTodayByEmployee(employee.id, todayDate);

    if (existingCheckIn) {
      throw new AppError(409, "Employee has already checked in today.", [
        { attendance: toSafeAttendance(existingCheckIn) },
      ]);
    }

    const attendance = await attendanceRepository.createCheckIn({
      employee: { connect: { id: employee.id } },
      user: { connect: { id: user.id } },
      workMode: { connect: { id: workMode.id } },
      date: todayDate,
      checkInAt: now,
      location: input.location.trim(),
      note: input.note.trim() || null,
    });

    await attendanceRepository.updateEmployeeLastCheckIn(
      employee.id,
      `${getBusinessDateString(now)} ${formatCheckInTime(now)}`,
    );

    return {
      attendance: toSafeAttendance(attendance),
    };
  },
};
