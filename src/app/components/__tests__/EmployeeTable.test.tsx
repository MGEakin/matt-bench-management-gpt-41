import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EmployeeTable from "../EmployeeTable";
import { Employee } from "../../types";

import "@testing-library/jest-dom";
import { create } from "react-test-renderer";

describe("EmployeeTable", () => {
  const employees: Employee[] = [
    {
      id: 1,
      name: "Alice Smith",
      title: "QA Lead",
      studio: "Studio A",
      practice: "Testing",
      region: "Americas",
      location: "New York",
      skill_level: "Senior",
      current_assignment: "Project X",
    },
  ];

  it("renders employee rows", () => {
    render(
      <EmployeeTable
        employees={employees}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("QA Lead")).toBeInTheDocument();
  });

  it("renders empty state when no employees", () => {
    render(
      <EmployeeTable employees={[]} onEdit={() => {}} onDelete={() => {}} />,
    );
    expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    const onEdit = vi.fn();
    render(
      <EmployeeTable
        employees={employees}
        onEdit={onEdit}
        onDelete={() => {}}
      />,
    );
    const editButton = screen.getByRole("button", { name: /Edit/i });
    editButton.click();
    expect(onEdit).toHaveBeenCalledWith(employees[0]);
  });

  it("calls onDelete when Delete button is clicked", () => {
    const onDelete = vi.fn();
    render(
      <EmployeeTable
        employees={employees}
        onEdit={() => {}}
        onDelete={onDelete}
      />,
    );
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledWith(employees[0].id);
  });

  it("matches snapshot", () => {
    const tree = create(
      <EmployeeTable
        employees={employees}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has accessible table", () => {
    render(
      <EmployeeTable
        employees={employees}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
