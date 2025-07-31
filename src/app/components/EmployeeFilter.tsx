import React, { useEffect, useState } from "react";
import { Practice } from "../../types/practice";
import { Studio } from "../../types/studio";
import { fetchPractices } from "../../lib/fetchPractices";
import { fetchStudios } from "../../lib/fetchStudios";

interface EmployeeFilterProps {
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
}

const fields = [
  "name",
  "title",
  "studio",
  "practice",
  "region",
  "location",
  "skill_level",
  "current_assignment",
];

const EmployeeFilter: React.FC<EmployeeFilterProps> = ({ filters, onChange }) => {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loadingPractices, setLoadingPractices] = useState(true);
  const [errorPractices, setErrorPractices] = useState<string | null>(null);

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loadingStudios, setLoadingStudios] = useState(true);
  const [errorStudios, setErrorStudios] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoadingPractices(true);
    fetchPractices()
      .then((data) => {
        if (mounted) {
          setPractices(data);
          setLoadingPractices(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setErrorPractices(err.message);
          setLoadingPractices(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoadingStudios(true);
    fetchStudios()
      .then((data) => {
        if (mounted) {
          setStudios(data);
          setLoadingStudios(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setErrorStudios(err.message);
          setLoadingStudios(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <form
      className="flex flex-wrap gap-4 mb-6"
      role="form"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Render all fields except practice and studio as text inputs */}
      {fields.filter((field) => field !== "practice" && field !== "studio").map((field) => (
        <input
          key={field}
          type="text"
          placeholder={`Filter by ${field.replace("_", " ")}`}
          value={filters[field] || ""}
          onChange={(e) => onChange({ ...filters, [field]: e.target.value })}
          className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
        />
      ))}
      {/* Studio dropdown */}
      <div>
        {loadingStudios ? (
          <select className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" disabled>
            <option>Loading studios...</option>
          </select>
        ) : errorStudios ? (
          <select className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" disabled>
            <option>Error loading studios</option>
          </select>
        ) : (
          <select
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            value={filters.studio || ""}
            onChange={(e) => onChange({ ...filters, studio: e.target.value })}
          >
            <option value="">Filter by studio</option>
            {studios.map((studio) => (
              <option key={studio.id} value={studio.name}>
                {studio.name}
              </option>
            ))}
          </select>
        )}
      </div>
      {/* Practice dropdown */}
      <div>
        {loadingPractices ? (
          <select className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" disabled>
            <option>Loading practices...</option>
          </select>
        ) : errorPractices ? (
          <select className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white" disabled>
            <option>Error loading practices</option>
          </select>
        ) : (
          <select
            className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            value={filters.practice || ""}
            onChange={(e) => onChange({ ...filters, practice: e.target.value })}
          >
            <option value="">Filter by practice</option>
            {practices.map((practice) => (
              <option key={practice.id} value={practice.name}>
                {practice.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </form>
  );
};

export default EmployeeFilter;
