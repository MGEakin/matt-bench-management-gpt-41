import { Employee } from "../types/employee";

export async function fetchEmployeesByPractice(practice: string): Promise<Employee[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/practices$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/employees?practice=${encodeURIComponent(practice)}`);
  if (!res.ok) throw new Error("Failed to fetch employees for practice");
  return res.json();
}
