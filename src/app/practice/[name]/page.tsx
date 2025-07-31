import React from "react";
import { fetchPracticeByName } from "../../../lib/fetchPracticeByName";
import { fetchEmployeesByPractice } from "../../../lib/fetchEmployeesByPractice";
import PracticeDetailsTable from "../../components/PracticeDetailsTable";
import { Practice } from "../../../types/practice";

interface PracticeDetailsPageProps {
  params: { name: string };
}

const PracticeDetailsPage: React.FC<PracticeDetailsPageProps> = async ({ params }) => {
  const practice: Practice | null = await fetchPracticeByName(params.name);
  if (!practice) {
    return <div className="p-8">Practice not found.</div>;
  }
  const employees = await fetchEmployeesByPractice(practice.name);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Practice: {practice.name}</h1>
      <div className="mb-4 text-lg font-semibold">Total Employees: {employees.length}</div>
      <PracticeDetailsTable employees={employees} />
    </div>
  );
};

export default PracticeDetailsPage;
