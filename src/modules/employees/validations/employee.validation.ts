import { z } from "zod";

const probationNoteValidation = z.object({
  note: z.string().max(1000).optional().default(""),
}).default({ note: "" });

const employeeIdParamsValidation = z.object({
  id: z.string().uuid("Employee ID is invalid."),
});

const employeeStatusValidation = z.enum(["ใช้งาน", "ทดลองงาน", "ลา", "ไม่ใช้งาน"]);

const probationStatusValidation = z.enum(["ผ่าน", "รอดำเนินการ", "ต้องรีวิว", "ไม่ผ่าน"]);

export const listEmployeesValidation = z.object({
  query: z.object({
    search: z.string().max(120).optional(),
    team: z.string().max(80).optional(),
    status: employeeStatusValidation.optional(),
    employmentType: z.enum(["Full-time", "Part-time", "Contract"]).optional(),
  }).default({}),
});

export const createEmployeeValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required.").max(120),
    nickname: z.string().min(1, "Nickname is required.").max(40),
    email: z.email("Email is invalid.").toLowerCase(),
    phone: z.string().min(1, "Phone is required.").max(40),
    position: z.string().min(1, "Position is required.").max(120),
    team: z.string().min(1, "Team is required.").max(80),
    manager: z.string().min(1, "Manager is required.").max(120),
    startDate: z.iso.date("Start date is invalid."),
    employmentType: z.enum(["Full-time", "Part-time", "Contract"]),
    location: z.string().min(1, "Location is required.").max(80),
    probation: z.object({
      day30: probationNoteValidation,
      day60: probationNoteValidation,
      day90: probationNoteValidation,
    }).default({
      day30: { note: "" },
      day60: { note: "" },
      day90: { note: "" },
    }),
  }),
});

export const updateEmployeeValidation = z.object({
  params: employeeIdParamsValidation,
  body: z.object({
    name: z.string().min(1, "Name is required.").max(120).optional(),
    nickname: z.string().min(1, "Nickname is required.").max(40).optional(),
    email: z.email("Email is invalid.").toLowerCase().optional(),
    phone: z.string().min(1, "Phone is required.").max(40).optional(),
    position: z.string().min(1, "Position is required.").max(120).optional(),
    team: z.string().min(1, "Team is required.").max(80).optional(),
    manager: z.string().min(1, "Manager is required.").max(120).optional(),
    startDate: z.iso.date("Start date is invalid.").optional(),
    employmentType: z.enum(["Full-time", "Part-time", "Contract"]).optional(),
    location: z.string().min(1, "Location is required.").max(80).optional(),
    status: employeeStatusValidation.optional(),
    utilization: z.number().int().min(0).max(100).optional(),
    lastCheckIn: z.string().max(80).nullable().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: "At least one employee field is required.",
  }),
});

export const updateEmployeeProbationReviewValidation = z.object({
  params: employeeIdParamsValidation.extend({
    checkpoint: z.enum(["30", "60", "90"]).transform(Number),
  }),
  body: z.object({
    status: probationStatusValidation.optional(),
    score: z.number().int().min(0).max(100).nullable().optional(),
    reviewDate: z.iso.date("Review date is invalid.").optional(),
    note: z.string().max(1000).nullable().optional(),
  }).refine((data) => Object.keys(data).length > 0, {
    message: "At least one probation review field is required.",
  }),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeValidation>["body"];
export type ListEmployeesQuery = z.infer<typeof listEmployeesValidation>["query"];
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeValidation>["body"];
export type UpdateEmployeeProbationReviewInput = z.infer<typeof updateEmployeeProbationReviewValidation>["body"];
