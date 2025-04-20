import { z } from "zod";

export const claimSchema = z.object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    user: z.object({
        id: z.number(),
        name: z.string(),
        storage: z.string()
    }),
    plan: z.object({
        id: z.number(),
        name: z.string(),
        sizeLabel: z.string()
    }),
    claim_status: z.object({
        id: z.number(),
        name: z.string()
    })
});

export const newClaimsCountSchema = z.object({
    count: z.number()
});

export const claimArraySchema = z.array(claimSchema);