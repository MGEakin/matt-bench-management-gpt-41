import React from "react";
import { Location } from "../../types/location";

interface LocationListTableProps {
  locations: Location[];
}

const LocationListTable: React.FC<LocationListTableProps> = ({ locations }) => (
  <main className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6">Location List</h1>
    <table className="min-w-full border border-gray-300 dark:border-gray-700">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2 border-b">ID</th>
          <th className="px-4 py-2 border-b">Name</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <tr key={location.id} className="even:bg-gray-50 dark:even:bg-gray-900">
            <td className="px-4 py-2 border-b">{location.id}</td>
            <td className="px-4 py-2 border-b">{location.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
);

export default LocationListTable;
