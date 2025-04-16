import { z } from "zod";

export const storageInfoSchema = z.object({
    used: z.number(),
    total: z.number()
})

export const fileTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string()
});

export const tagSchema = z.object({
    id: z.number(),
    name: z.string(),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
});

export const fileSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    path: z.string(),
    size: z.number(),
    storage: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    tags: z.array(tagSchema),
    file_type: fileTypeSchema
});

export const settingSchema = z.object({
    key: z.string(),
    value: z.string()
});

export const extensionSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    file_type: z.object({
        id: z.number(),
        name: z.string(),
        image: z.string()
    })
});

export const countrySchema = z.object({
    id: z.number(),
    name: z.string(),
    code: z.string()
});

export const userInfoSchema = z.object({
    id: z.number(),
    birthdate: z.string().nullable(),
    job: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    address: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    country: z.object({
        id: z.number(),
        name: z.string(),
        code: z.string()
    }).nullable(),
});

export const fileArraySchema = z.array(fileSchema);
export const tagsArraySchema = z.array(tagSchema);
export const settingsArraySchema = z.array(settingSchema);
export const extensionsArraySchema = z.array(extensionSchema);
export const countriesArraySchema = z.array(countrySchema)