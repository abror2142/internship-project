import { z } from "zod";
import { claimPaginatedSchema, claimSchema, logsPaginatedSchema, userWithRolesSchema } from "./zod";

export type Claim = z.infer<typeof claimSchema>;
export type ClaimPaginated = z.infer<typeof claimPaginatedSchema>;
export type UserWithRoles = z.infer<typeof userWithRolesSchema>;
export type LogsPaginated = z.infer<typeof logsPaginatedSchema>;