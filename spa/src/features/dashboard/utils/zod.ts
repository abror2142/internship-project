import { z } from "zod";
import { userMeSchema } from "../../shared/utils/zod";

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

export const claimPaginatedSchema = z.object({
    current_page: z.number(),
    data: z.array(claimSchema),
    first_page_url: z.string(),
    from: z.number().nullable(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(z.object({
        url: z.string().nullable(),
        label: z.string(),
        active: z.boolean()
    })),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number().nullable(),
    total: z.number()
});

export const userWithRolesSchema = userMeSchema.merge(
    z.object({
        roles: z.array(z.object({
            id: z.number(),
            name: z.string(),
            pivot: z.object({
                model_type: z.string(),
                model_id: z.number(),
                role_id: z.number()
            })
        }))
    })
)

export const newClaimsCountSchema = z.object({
    count: z.number()
});

export const logSchema = z.object({
    id: z.number(),
    action: z.string(),
    target: z.string(),
    user_id: z.number(),
    successful: z.number(),
    created_at: z.string(),
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string()
    })
});

export const logsPaginatedSchema = z.object({
    current_page: z.number(),
    data: z.array(logSchema),
    first_page_url: z.string(),
    from: z.number().nullable(),
    last_page: z.number(),
    last_page_url: z.string(),
    links: z.array(z.object({
        url: z.string().nullable(),
        label: z.string(),
        active: z.boolean()
    })),
    next_page_url: z.string().nullable(),
    path: z.string(),
    per_page: z.number(),
    prev_page_url: z.string().nullable(),
    to: z.number().nullable(),
    total: z.number()
});

export const claimArraySchema = z.array(claimSchema);