import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable(),
    roles: z.array(z.string()),
    storage: z.object({
        used: z.number().nullable(),
        allocated: z.number()
    })
});

export const loginSchema = z.object({
    token: z.string(),
    user: userSchema,
});

export const userMeSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable(),
    email: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    email_verified_at: z.string(),
    roles: z.array(z.string()),
    storage: z.object({
        used: z.number().nullable(),
        allocated: z.number()
    })
});


