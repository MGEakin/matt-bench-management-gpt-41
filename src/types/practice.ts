import { z } from "zod";

export const PracticeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Practice = z.infer<typeof PracticeSchema>;
