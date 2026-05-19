import { z } from "zod";

const probationNoteValidation = z.object({
  note: z.string().max(1000).optional().default(""),
}).default({ note: "" });

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

export type CreateEmployeeInput = z.infer<typeof createEmployeeValidation>["body"];
