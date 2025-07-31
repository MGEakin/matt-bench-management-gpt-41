import { Practice } from "../types/practice";

export async function fetchPracticeByName(name: string): Promise<Practice | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/practices$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/practices?name=${encodeURIComponent(name)}`);
  if (!res.ok) return null;
  const practices = await res.json();
  return practices.length ? practices[0] : null;
}
