import { Studio } from "../types/studio";

export async function fetchStudioByName(name: string): Promise<Studio | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/studios$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/studios/${encodeURIComponent(name)}`);
  if (!res.ok) return null;
  return res.json();
}
