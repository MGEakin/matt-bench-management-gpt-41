import { z } from "zod";

export const StudioSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
});

export type Studio = z.infer<typeof StudioSchema>;
