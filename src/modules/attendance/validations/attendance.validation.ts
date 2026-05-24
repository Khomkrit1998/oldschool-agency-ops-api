import { z } from "zod";

export const createAttendanceCheckInValidation = z.object({
  body: z.object({
    workModeId: z.string().uuid("Work mode is invalid."),
    location: z.string().min(1, "Location is required.").max(160),
    note: z.string().max(1000).optional().default(""),
  }),
});

export const listAttendanceCheckInsValidation = z.object({
  query: z.object({
    date: z.iso.date("Date is invalid.").optional(),
    search: z.string().max(120).optional(),
    team: z.string().max(80).optional(),
  }).default({}),
});

export type CreateAttendanceCheckInInput = z.infer<typeof createAttendanceCheckInValidation>["body"];
export type ListAttendanceCheckInsQuery = z.infer<typeof listAttendanceCheckInsValidation>["query"];
