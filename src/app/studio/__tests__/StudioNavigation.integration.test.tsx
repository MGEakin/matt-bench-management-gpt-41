import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmployeeTable from "../../components/EmployeeTable";
import { Employee } from "../../../types/employee";
const employees: Employee[] = [
  {
    id: 1,
    name: "Consultant for Modern Software Development - Development",
    title: "Consultant",
    studio: "Modern Software Development",
    practice: "Development",
    region: "Global",
    location: "Remote",
    skill_level: "Mid",
    current_assignment: "Assigned to Development",
  },
  {
    id: 2,
    name: "Consultant for Cloud - Cloud",
    title: "Consultant",
    studio: "Cloud",
    practice: "Cloud",
    region: "Global",
    location: "Remote",
    skill_level: "Mid",
    current_assignment: "Assigned to Cloud",
  },
];

describe("Studio navigation integration", () => {
  it("Studio link has correct href and simulates navigation intent", async () => {
    render(
      <EmployeeTable employees={employees} onEdit={() => {}} onDelete={() => {}} />
    );
    const studioLink = screen.getByText("Modern Software Development");
    expect(studioLink).toBeInTheDocument();
    expect(studioLink.closest('a')).toHaveAttribute('href', '/studio/Modern%20Software%20Development');
    // Simulate click
    studioLink.closest('a')?.click();
    // In a real browser, this would navigate; here we just verify the link
  });
});
