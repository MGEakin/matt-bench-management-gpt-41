import { fetchPractices } from "../../lib/fetchPractices";
import { Practice } from "../../types/practice";
import PracticeListTable from "./PracticeListTable";

export default async function PracticeListPage() {
  const practices: Practice[] = await fetchPractices();
  return <PracticeListTable practices={practices} />;
}
