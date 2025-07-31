import { fetchLocations } from "../../lib/fetchLocations";
import { Location } from "../../types/location";
import LocationListTable from "./LocationListTable";

export default async function LocationListPage() {
  const locations: Location[] = await fetchLocations();
  return <LocationListTable locations={locations} />;
}
