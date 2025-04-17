import { z } from "zod";
import { userMeSchema, userSchema } from "../utils/zod";

export type User = z.infer<typeof userSchema>;
export type UserMe = z.infer<typeof userMeSchema>;