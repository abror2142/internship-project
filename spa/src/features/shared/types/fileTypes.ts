import { z } from "zod";
import { extensionSchema, fileSchema, settingSchema, storageInfoSchema, tagSchema } from "../utils/zod/FileZod";

export type Tag = z.infer<typeof tagSchema>;
export type File = z.infer<typeof fileSchema>;
export type StorageInfoType = z.infer<typeof storageInfoSchema>;
export type Extension = z.infer<typeof extensionSchema>;
export type SettingsData = z.infer<typeof settingSchema>;
export type Settings = {
    fileSizeLimit: number;
    storage: string;
    storageSizeLimit: number;
}