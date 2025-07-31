import React from "react";
import { fetchStudioByName } from "../../../lib/fetchStudioByName";
import { fetchEmployeesByStudio } from "../../../lib/fetchEmployeesByStudio";
import PracticeDetailsTable from "../../components/PracticeDetailsTable";
import { Studio } from "../../../types/studio";


interface StudioDetailsPageProps {
  params: { name: string };
  fetchStudioByNameFn?: typeof fetchStudioByName;
  fetchEmployeesByStudioFn?: typeof fetchEmployeesByStudio;
}

const StudioDetailsPage = async ({
  params,
  fetchStudioByNameFn = fetchStudioByName,
  fetchEmployeesByStudioFn = fetchEmployeesByStudio,
}: StudioDetailsPageProps) => {
  const awaitedParams = await params;
  const studio: Studio | null = await fetchStudioByNameFn(awaitedParams.name);
  if (!studio) {
    return <div className="p-8">Studio not found.</div>;
  }
  const employees = await fetchEmployeesByStudioFn(studio.name);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Studio: {studio.name}</h1>
      <div className="mb-4 text-lg font-semibold">Total Employees: {employees.length}</div>
      <PracticeDetailsTable employees={employees} />
    </div>
  );
};

export default StudioDetailsPage;
