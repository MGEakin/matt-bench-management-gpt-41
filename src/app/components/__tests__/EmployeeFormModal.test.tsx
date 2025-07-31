import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeFormModal from "../EmployeeFormModal";
import { Employee } from "../../types";

import "@testing-library/jest-dom";
import { create } from "react-test-renderer";

describe("EmployeeFormModal", () => {
  const onClose = vi.fn();
  const onSave = vi.fn();
  const initialData: Employee = {
    id: 1,
    name: "Alice Smith",
    title: "QA Lead",
    studio: "Studio A",
    practice: "Testing",
    region: "Americas",
    location: "New York",
    skill_level: "Senior",
    current_assignment: "Project X",
  };

  it("renders modal with initial data for edit", () => {
    render(
      <EmployeeFormModal
        open={true}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
      />,
    );
    expect(screen.getByDisplayValue("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Edit Employee")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(
      <EmployeeFormModal
        open={true}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
      />,
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onSave when form is submitted", () => {
    render(
      <EmployeeFormModal
        open={true}
        onClose={onClose}
        onSave={onSave}
        initialData={initialData}
      />,
    );
    fireEvent.click(screen.getByText("Update"));
    expect(onSave).toHaveBeenCalled();
  });

  it("renders form fields", () => {
    render(
      <EmployeeFormModal
        open={true}
        onClose={() => {}}
        onSave={() => {}}
        initialData={initialData}
      />,
    );
    expect(screen.getByDisplayValue("Alice Smith")).toBeInTheDocument();
    expect(screen.getByDisplayValue("QA Lead")).toBeInTheDocument();
  });

  it("renders empty form for new employee", () => {
    render(
      <EmployeeFormModal
        open={true}
        onClose={() => {}}
        onSave={() => {}}
        initialData={undefined}
      />,
    );
    expect(screen.getByText("Add Employee")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toHaveValue("");
  });

  it("matches snapshot", () => {
    const tree = create(
      <EmployeeFormModal
        open={true}
        onClose={() => {}}
        onSave={() => {}}
        initialData={initialData}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has accessible dialog", () => {
    render(
      <EmployeeFormModal
        open={true}
        onClose={() => {}}
        onSave={() => {}}
        initialData={initialData}
      />,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
