import { Practice } from "../types/practice";

export async function fetchPractices(): Promise<Practice[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/practices";
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Failed to fetch practices");
  return res.json();
}
