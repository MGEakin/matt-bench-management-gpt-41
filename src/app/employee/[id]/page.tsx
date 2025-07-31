"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeSchema, Employee } from '../../../types/employee';
import ErrorBoundary from '../../../components/ErrorBoundary';

export default function EmployeeDetailsPage() {
  const router = useRouter();
  const id = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:4000/api/employees/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data === null) {
          setEmployee(null);
          setError(null);
        } else {
          const result = EmployeeSchema.safeParse(data);
          if (result.success) {
            setEmployee(result.data);
            setError(null);
          } else {
            setEmployee(null);
            setError('Invalid employee data');
          }
        }
      })
      .catch(() => setError('Failed to fetch employee'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  if (!employee && !error) return <div className="p-8 text-center">Employee not found.</div>;

  if (employee) {
    return (
      <ErrorBoundary>
        <main className="max-w-xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">{employee.name}</h1>
          <ul className="space-y-2">
            <li><strong>Title:</strong> {employee.title}</li>
            <li><strong>Studio:</strong> {employee.studio}</li>
            <li><strong>Practice:</strong> {employee.practice}</li>
            <li><strong>Region:</strong> {employee.region}</li>
            <li><strong>Location:</strong> {employee.location}</li>
            <li><strong>Skill Level:</strong> {employee.skill_level}</li>
            <li><strong>Current Assignment:</strong> {employee.current_assignment || '-'}</li>
          </ul>
          <button className="mt-8 px-4 py-2 bg-gray-300 rounded" onClick={() => router.back()}>
            Back
          </button>
        </main>
      </ErrorBoundary>
    );
  }

  return null;
}
