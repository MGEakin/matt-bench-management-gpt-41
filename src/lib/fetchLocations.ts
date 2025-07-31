import { Location } from "../types/location";

export async function fetchLocations(): Promise<Location[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/locations$/, "") || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/locations`);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
}
