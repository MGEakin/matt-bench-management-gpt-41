import { fetchRegions } from "../../lib/fetchRegions";
import { Region } from "../../types/region";
import RegionListTable from "./RegionListTable";

export default async function RegionListPage() {
  const regions: Region[] = await fetchRegions();
  return <RegionListTable regions={regions} />;
}
