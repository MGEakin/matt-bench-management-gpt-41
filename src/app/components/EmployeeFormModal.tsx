"use client";
import React, { useState, useEffect } from "react";
import { Employee } from "../../types/employee";
import { Practice } from "../../types/practice";
import { fetchPractices } from "../../lib/fetchPractices";

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, "id">, id?: number) => void;
  initialData?: Employee | null;
}

const defaultEmployee: Omit<Employee, "id"> = {
  name: "",
  title: "",
  studio: "",
  practice: "",
  region: "",
  location: "",
  skill_level: "",
  current_assignment: "",
};

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [form, setForm] = useState<Omit<Employee, "id">>(defaultEmployee);
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loadingPractices, setLoadingPractices] = useState(true);
  const [errorPractices, setErrorPractices] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm(defaultEmployee);
    }
  }, [initialData, open]);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form, initialData?.id);
          }}
        >
          {/* Render all fields except practice as text inputs */}
          {Object.keys(defaultEmployee)
            .filter((key) => key !== "practice")
            .map((key) => (
              <div key={key} className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium mb-1 capitalize">
                  {key.replace("_", " ")}
                </label>
                <input
                  className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
                  type="text"
                  value={form[key as keyof typeof form] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={key !== "current_assignment"}
                  placeholder={key
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                />
              </div>
            ))}
          {/* Practice dropdown */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium mb-1">Practice</label>
            {loadingPractices ? (
              <div className="text-gray-500">Loading practices...</div>
            ) : errorPractices ? (
              <div className="text-red-500">{errorPractices}</div>
            ) : (
              <select
                className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
                value={form.practice}
                onChange={(e) => setForm({ ...form, practice: e.target.value })}
                required
              >
                <option value="" disabled>
                  Select a practice
                </option>
                {practices.map((practice) => (
                  <option key={practice.id} value={practice.name}>
                    {practice.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
