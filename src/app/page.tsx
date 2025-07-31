"use client";
import React, { Suspense, useMemo, useCallback } from "react";

import EmployeeTable from "./components/EmployeeTable";
import EmployeeFormModal from "./components/EmployeeFormModal";
import EmployeeFilter from "./components/EmployeeFilter";
import { EmployeeSchema, Employee } from "../types/employee";
import { useEffect, useState } from "react";
import { useEmployeeStore } from "../store/employeeStore";
import Button from "../components/ui/Button";

export default function Home() {
  const setEmployees = useEmployeeStore((state) => state.setEmployees);
  const employees = useEmployeeStore((state) => state.employees);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchEmployees = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(
      `http://localhost:4000/api/employees${params ? `?${params}` : ""}`,
    );
    const data = await res.json();
    // Validate array of employees
    const employees = Array.isArray(data)
      ? data.filter((emp) => {
          const result = EmployeeSchema.safeParse(emp);
          return result.success;
        })
      : [];
    setEmployees(employees);
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, [filters]);

  const filteredEmployees = useMemo(() => employees, [employees]);

  const handleSave = useCallback(
    async (data: Omit<Employee, "id">, id?: number) => {
      if (id) {
        await fetch(`http://localhost:4000/api/employees/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`http://localhost:4000/api/employees`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setModalOpen(false);
      setEditing(null);
      fetchEmployees();
    },
    [fetchEmployees],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await fetch(`http://localhost:4000/api/employees/${id}`, {
        method: "DELETE",
      });
      fetchEmployees();
    },
    [fetchEmployees],
  );

  return (
    <main className="font-sans min-h-screen p-8 pb-20 sm:p-20" role="main">
      <h1 className="text-2xl font-bold mb-8">Employee List</h1>
      <Button className="mb-4" onClick={() => setModalOpen(true)}>
        Add Employee
      </Button>
      <EmployeeFilter filters={filters} onChange={setFilters} />
      <Suspense
        fallback={<div className="text-center py-8">Loading employees...</div>}
      >
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={useCallback((emp) => {
            setEditing(emp);
            setModalOpen(true);
          }, [])}
          onDelete={handleDelete}
        />
      </Suspense>
      <EmployeeFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
        initialData={editing}
      />
    </main>
  );
}
