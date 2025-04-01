import { array } from "yup";
import { z } from "zod";

export const AuthResponse = z.object({
    token: z.string(),
    user: z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
        roles: z.array(z.string())
    })
});

export const AuthMeResponse = z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
        email: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
        email_verified_at: z.string(),
        roles: z.array(z.string()),
    })
});

export const AuthUserResponse = z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
        roles: z.array(z.string())
    })
});

