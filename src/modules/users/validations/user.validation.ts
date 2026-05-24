import { z } from "zod";
import { permissionCatalog } from "../../../shared/permissions";

export const userIdParamsValidation = z.object({
  id: z.string().uuid("User ID is invalid."),
});

export const updateUserPermissionsValidation = z.object({
  params: userIdParamsValidation,
  body: z.object({
    permissions: z.array(z.enum(permissionCatalog)).default([]),
  }),
});

export type UpdateUserPermissionsInput = z.infer<typeof updateUserPermissionsValidation>["body"];
