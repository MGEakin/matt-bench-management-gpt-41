import { Region } from "../types/region";

export async function fetchRegions(): Promise<Region[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/regions$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/regions`);
  if (!res.ok) throw new Error("Failed to fetch regions");
  return res.json();
}
