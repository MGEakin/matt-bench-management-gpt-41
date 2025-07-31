import { z } from "zod";

export const EmployeeSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  title: z.string(),
  studio: z.string(),
  practice: z.string(),
  region: z.string(),
  location: z.string(),
  skill_level: z.string(),
  current_assignment: z.string().optional(),
});

export type Employee = z.infer<typeof EmployeeSchema>;
