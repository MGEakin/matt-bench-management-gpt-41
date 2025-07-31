import { fetchStudios } from "../../lib/fetchStudios";
import { Studio } from "../../types/studio";
import StudioListTable from "./StudioListTable";

export default async function StudioListPage() {
  const studios: Studio[] = await fetchStudios();
  return <StudioListTable studios={studios} />;
}
