import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

beforeEach(() => {
  vi.resetModules();
});

describe("StudioDetailsPage", () => {
  it("renders studio details and employee count", async () => {
    const mockFetchStudioByName = async (name: string) => ({ id: 1, name });
    const mockFetchEmployeesByStudio = async (studio: string) => [
      {
        id: 1,
        name: "Consultant 1",
        title: "Specialist",
        studio,
        practice: "Development",
        region: "Americas",
        location: "Remote",
        skill_level: "Mid",
        current_assignment: "Assigned to Development",
      },
    ];
    const { default: StudioDetailsPage } = await import("../[name]/page");

    const Page = await StudioDetailsPage({
      params: { name: "Modern Software Development" },
      fetchStudioByNameFn: mockFetchStudioByName,
      fetchEmployeesByStudioFn: mockFetchEmployeesByStudio,
    });
    render(Page);
    expect(
      await screen.findByText((content, element) =>
        element?.textContent === "Studio: Modern Software Development"
      )
    ).toBeInTheDocument();
    expect(await screen.findByText("Total Employees: 1")).toBeInTheDocument();
    expect(await screen.findByText("Consultant 1")).toBeInTheDocument();
  });

  it("shows not found for missing studio", async () => {
    const mockFetchStudioByName = async () => null;
    const { default: StudioDetailsPage } = await import("../[name]/page");

    const Page = await StudioDetailsPage({
      params: { name: "Nonexistent" },
      fetchStudioByNameFn: mockFetchStudioByName,
    });
    render(Page);
    expect(screen.getByText("Studio not found.")).toBeInTheDocument();
  });
});
