import { z } from "zod";
import { claimSchema } from "./zod";

export type Claim = z.infer<typeof claimSchema>;