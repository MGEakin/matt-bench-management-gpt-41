import { Employee } from "../types/employee";

export async function fetchEmployeesByStudio(studio: string): Promise<Employee[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/studios$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/employees?studio=${encodeURIComponent(studio)}`);
  if (!res.ok) throw new Error("Failed to fetch employees for studio");
  return res.json();
}
