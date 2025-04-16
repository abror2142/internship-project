import { z } from "zod";
import { userSchema } from "../utils/zod";

export type User = z.infer<typeof userSchema>;