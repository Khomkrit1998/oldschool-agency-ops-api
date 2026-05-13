import { z } from "zod";

export const registerValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required.").max(120),
    email: z.email("Email is invalid.").toLowerCase(),
    password: z.string().min(8, "Password must be at least 8 characters."),
  }),
});

export const loginValidation = z.object({
  body: z.object({
    email: z.email("Email is invalid.").toLowerCase(),
    password: z.string().min(1, "Password is required."),
  }),
});

export const refreshTokenValidation = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required."),
  }),
});

export const updateProfileValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required.").max(120).optional(),
    email: z.email("Email is invalid.").toLowerCase().optional(),
  }).refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one profile field is required.",
  }),
});

export type RegisterInput = z.infer<typeof registerValidation>["body"];
export type LoginInput = z.infer<typeof loginValidation>["body"];
export type RefreshTokenInput = z.infer<typeof refreshTokenValidation>["body"];
export type UpdateProfileInput = z.infer<typeof updateProfileValidation>["body"];
