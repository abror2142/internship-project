import { z } from "zod";
import { countrySchema, extensionSchema, fileSchema, settingSchema, storageInfoSchema, tagSchema, userInfoSchema } from "../utils/zod/FileZod";
import { planSchema } from "../utils/zod";

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
export type Country = z.infer<typeof countrySchema>;
export type UserInfo = z.infer<typeof userInfoSchema>;
export type Plan = z.infer<typeof planSchema>;