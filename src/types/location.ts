import { z } from "zod";

export const LocationSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

export type Location = z.infer<typeof LocationSchema>;
