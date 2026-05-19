import type {
  Employee,
  EmployeeProbationReview,
  EmployeeStatus,
  EmploymentType,
  ProbationReviewStatus,
} from "@prisma/client";
import { AppError } from "../../../shared/errors/app-error";
import { employeeRepository } from "../repositories/employee.repository";
import type { CreateEmployeeInput } from "../validations/employee.validation";

type EmployeeWithReviews = Employee & {
  probationReviews: EmployeeProbationReview[];
};

type SafeEmployee = ReturnType<typeof toSafeEmployee>;

const employmentTypeMap: Record<CreateEmployeeInput["employmentType"], EmploymentType> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACT",
};

const employeeStatusLabel: Record<EmployeeStatus, string> = {
  ACTIVE: "ใช้งาน",
  PROBATION: "ทดลองงาน",
  LEAVE: "ลา",
  INACTIVE: "ไม่ใช้งาน",
};

const employmentTypeLabel: Record<EmploymentType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
};

const probationStatusLabel: Record<ProbationReviewStatus, string> = {
  PASSED: "ผ่าน",
  PENDING: "รอดำเนินการ",
  REVIEW: "ต้องรีวิว",
  FAILED: "ไม่ผ่าน",
};

const teamCodeMap: Record<string, string> = {
  Strategy: "STR",
  Production: "PRD",
  Finance: "FIN",
  Support: "SUP",
};

function parseDateOnly(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function toDateOnlyString(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTeamCode(team: string) {
  const configuredCode = teamCodeMap[team];

  if (configuredCode) {
    return configuredCode;
  }

  return team
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");
}

async function generateEmployeeCode(team: string) {
  const prefix = `OA-${getTeamCode(team)}-`;
  const latestEmployee = await employeeRepository.findLatestByEmployeeCodePrefix(prefix);
  const latestRunningNumber = latestEmployee
    ? Number(latestEmployee.employeeCode.replace(prefix, ""))
    : 0;
  const nextRunningNumber = Number.isFinite(latestRunningNumber) ? latestRunningNumber + 1 : 1;

  return `${prefix}${String(nextRunningNumber).padStart(3, "0")}`;
}

function toSafeEmployee(employee: EmployeeWithReviews) {
  const reviews = employee.probationReviews.reduce<Record<number, EmployeeProbationReview>>((result, review) => {
    result[review.checkpoint] = review;
    return result;
  }, {});

  function getReview(checkpoint: 30 | 60 | 90) {
    const review = reviews[checkpoint];

    return {
      status: probationStatusLabel[review.status],
      score: review.score,
      reviewDate: toDateOnlyString(review.reviewDate),
      note: review.note ?? "",
    };
  }

  return {
    id: employee.id,
    name: employee.name,
    nickname: employee.nickname,
    email: employee.email,
    phone: employee.phone,
    employeeCode: employee.employeeCode,
    position: employee.position,
    team: employee.team,
    manager: employee.manager,
    status: employeeStatusLabel[employee.status],
    employmentType: employmentTypeLabel[employee.employmentType],
    utilization: employee.utilization,
    location: employee.location,
    startDate: toDateOnlyString(employee.startDate),
    lastCheckIn: employee.lastCheckIn,
    probation: {
      day30: getReview(30),
      day60: getReview(60),
      day90: getReview(90),
    },
    createdAt: employee.createdAt.toISOString(),
    updatedAt: employee.updatedAt.toISOString(),
  };
}

function getProbationSummary(employee: SafeEmployee) {
  const reviews = [
    employee.probation.day30,
    employee.probation.day60,
    employee.probation.day90,
  ];

  if (reviews.some((review) => review.status === "ไม่ผ่าน")) {
    return "ไม่ผ่าน";
  }

  if (reviews.some((review) => review.status === "ต้องรีวิว")) {
    return "ต้องรีวิว";
  }

  if (reviews.some((review) => review.status === "รอดำเนินการ")) {
    return "รอดำเนินการ";
  }

  return "ผ่าน";
}

function getUpcomingActionItems(employees: SafeEmployee[]) {
  const now = new Date();
  const windowEnd = new Date();
  windowEnd.setUTCDate(windowEnd.getUTCDate() + 14);

  return employees
    .flatMap((employee) => [
      { checkpoint: 30, review: employee.probation.day30 },
      { checkpoint: 60, review: employee.probation.day60 },
      { checkpoint: 90, review: employee.probation.day90 },
    ].map(({ checkpoint, review }) => ({
      id: `${employee.id}-${checkpoint}`,
      title: `รีวิวทดลองงาน ${checkpoint} วัน`,
      employeeId: employee.id,
      employeeName: employee.name,
      employeeCode: employee.employeeCode,
      team: employee.team,
      dueDate: review.reviewDate,
      status: review.status,
      priority: review.status === "ต้องรีวิว" ? "high" : "normal",
    })))
    .filter((item) => {
      if (item.status === "ผ่าน" || item.status === "ไม่ผ่าน") {
        return false;
      }

      const dueDate = parseDateOnly(item.dueDate);
      return dueDate <= windowEnd || item.status === "ต้องรีวิว";
    })
    .sort((left, right) => {
      if (left.priority !== right.priority) {
        return left.priority === "high" ? -1 : 1;
      }

      return parseDateOnly(left.dueDate).getTime() - parseDateOnly(right.dueDate).getTime();
    })
    .slice(0, 6);
}

function getRecentActivity(employees: SafeEmployee[]) {
  return employees
    .flatMap((employee) => [
      {
        id: `${employee.id}-created`,
        title: "เพิ่มพนักงานใหม่",
        description: `${employee.name} ถูกเพิ่มเข้า ${employee.team}`,
        employeeId: employee.id,
        employeeName: employee.name,
        employeeCode: employee.employeeCode,
        type: "created",
        occurredAt: employee.createdAt,
      },
      {
        id: `${employee.id}-probation-created`,
        title: "สร้าง probation timeline",
        description: `กำหนดรีวิว 30/60/90 วันให้ ${employee.name}`,
        employeeId: employee.id,
        employeeName: employee.name,
        employeeCode: employee.employeeCode,
        type: "probation",
        occurredAt: employee.createdAt,
      },
    ])
    .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())
    .slice(0, 8);
}

export const employeeService = {
  async list() {
    const employees = await employeeRepository.findMany();

    return {
      employees: employees.map(toSafeEmployee),
    };
  },

  async summary() {
    const employees = (await employeeRepository.findMany()).map(toSafeEmployee);
    const total = employees.length;
    const active = employees.filter((employee) => employee.status === "ใช้งาน").length;
    const probation = employees.filter((employee) => employee.status === "ทดลองงาน").length;
    const leave = employees.filter((employee) => employee.status === "ลา").length;
    const inactive = employees.filter((employee) => employee.status === "ไม่ใช้งาน").length;
    const averageUtilization = total
      ? Math.round(employees.reduce((sum, employee) => sum + employee.utilization, 0) / total)
      : 0;
    const needsReview = employees.filter((employee) => {
      const summary = getProbationSummary(employee);
      return summary === "รอดำเนินการ" || summary === "ต้องรีวิว";
    }).length;

    return {
      summary: {
        total,
        active,
        probation,
        leave,
        inactive,
        averageUtilization,
        needsReview,
      },
    };
  },

  async capacityByTeam() {
    const employees = (await employeeRepository.findMany()).map(toSafeEmployee);
    const grouped = employees.reduce<Record<string, SafeEmployee[]>>((result, employee) => {
      result[employee.team] = [...(result[employee.team] ?? []), employee];
      return result;
    }, {});

    return {
      teams: Object.entries(grouped)
        .map(([team, teamEmployees]) => ({
          team,
          employeeCount: teamEmployees.length,
          averageUtilization: teamEmployees.length
            ? Math.round(teamEmployees.reduce((sum, employee) => sum + employee.utilization, 0) / teamEmployees.length)
            : 0,
        }))
        .sort((left, right) => left.team.localeCompare(right.team)),
    };
  },

  async actionItems() {
    const employees = (await employeeRepository.findMany()).map(toSafeEmployee);

    return {
      items: getUpcomingActionItems(employees),
    };
  },

  async activity() {
    const employees = (await employeeRepository.findMany()).map(toSafeEmployee);

    return {
      activities: getRecentActivity(employees),
    };
  },

  async getById(id: string) {
    const employee = await employeeRepository.findById(id);

    if (!employee) {
      throw new AppError(404, "Employee not found.");
    }

    return {
      employee: toSafeEmployee(employee),
    };
  },

  async create(input: CreateEmployeeInput, createdById?: string) {
    const existingEmail = await employeeRepository.findByEmail(input.email);

    if (existingEmail) {
      throw new AppError(409, "Employee email is already in use.");
    }

    const startDate = parseDateOnly(input.startDate);
    const employeeCode = await generateEmployeeCode(input.team);
    const employee = await employeeRepository.create({
      name: input.name,
      nickname: input.nickname,
      email: input.email,
      phone: input.phone,
      employeeCode,
      position: input.position,
      team: input.team,
      manager: input.manager,
      status: "PROBATION",
      employmentType: employmentTypeMap[input.employmentType],
      location: input.location,
      startDate,
      lastCheckIn: null,
      createdById,
      probationReviews: {
        create: [
          {
            checkpoint: 30,
            reviewDate: addDays(startDate, 30),
            note: input.probation.day30.note || null,
          },
          {
            checkpoint: 60,
            reviewDate: addDays(startDate, 60),
            note: input.probation.day60.note || null,
          },
          {
            checkpoint: 90,
            reviewDate: addDays(startDate, 90),
            note: input.probation.day90.note || null,
          },
        ],
      },
    });

    return {
      employee: toSafeEmployee(employee),
    };
  },
};
