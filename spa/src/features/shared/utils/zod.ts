import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable(),
    roles: z.array(z.string()),
    storage: z.object({
        used: z.number(),
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
    email_verified_at: z.string().nullable(),
    storage: z.string()
});

export const planSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    billingPeriod: z.string(),
    duration: z.string(),
    sizeLabel: z.string(),
    created_at: z.string(),
    updated_at: z.string()
});

export const plansArraySchema = z.array(planSchema);
