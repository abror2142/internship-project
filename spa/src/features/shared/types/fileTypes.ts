import { z } from "zod";
import { fileSchema, storageInfoSchema, tagSchema } from "../utils/zod/FileZod";

export type Tag = z.infer<typeof tagSchema>;

export type File = z.infer<typeof fileSchema>;

export type StorageInfoType = z.infer<typeof storageInfoSchema>;