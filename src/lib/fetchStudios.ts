import { Studio } from "../types/studio";

export async function fetchStudios(): Promise<Studio[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/studios$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/studios`);
  if (!res.ok) throw new Error("Failed to fetch studios");
  return res.json();
}
