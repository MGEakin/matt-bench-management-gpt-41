import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PracticeDetailsTable from "../PracticeDetailsTable";
import { Employee } from "../../../types/employee";

const employees: Employee[] = [
  {
    id: 1,
    name: "Alice Smith",
    title: "Developer",
    studio: "Studio A",
    practice: "Development",
    region: "Americas",
    location: "New York",
    skill_level: "Senior",
    current_assignment: "Project X",
  },
  {
    id: 2,
    name: "Bob Johnson",
    title: "QA Lead",
    studio: "Studio B",
    practice: "Development",
    region: "EMEA",
    location: "London",
    skill_level: "Mid",
    current_assignment: "Project Y",
  },
];

describe("PracticeDetailsTable", () => {
  it("renders employee rows and links", () => {
    render(<PracticeDetailsTable employees={employees} />);
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBe(2);
  });

  it("shows 'No employees found' when empty", () => {
    render(<PracticeDetailsTable employees={[]} />);
    expect(screen.getByText("No employees found")).toBeInTheDocument();
  });
});
