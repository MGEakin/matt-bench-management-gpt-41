import { z } from "zod";

export const RegionSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

export type Region = z.infer<typeof RegionSchema>;
