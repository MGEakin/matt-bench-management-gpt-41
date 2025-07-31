import React from "react";
import Link from "next/link";
import { Employee } from "../../types/employee";

interface PracticeDetailsTableProps {
  employees: Employee[];
}

const PracticeDetailsTable: React.FC<PracticeDetailsTableProps> = ({ employees }) => (
  <div className="overflow-x-auto w-full [container-type: inline-size]">
    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Studio</th>
          <th className="px-4 py-2">Region</th>
          <th className="px-4 py-2">Location</th>
          <th className="px-4 py-2">Skill Level</th>
          <th className="px-4 py-2">Current Assignment</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
              No employees found
            </td>
          </tr>
        ) : (
          employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">
                <Link
                  href={`/employee/${emp.id}`}
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  {emp.name}
                </Link>
              </td>
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">{emp.title}</td>
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">{emp.studio}</td>
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">{emp.region}</td>
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">{emp.location}</td>
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">{emp.skill_level}</td>
              <td className="px-4 py-2 text-xs md:text-sm lg:text-base">{emp.current_assignment || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default PracticeDetailsTable;
