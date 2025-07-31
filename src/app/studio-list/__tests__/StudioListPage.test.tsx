import React from "react";
import { render, screen } from "@testing-library/react";
import StudioListTable from "../StudioListTable";

describe("StudioListTable", () => {
  it("renders a table of studios", () => {
    const studios = [
      { id: 1, name: "Modern Software Development" },
      { id: 2, name: "Cloud Engineering" },
      { id: 3, name: "Data & AI" },
    ];
    render(<StudioListTable studios={studios} />);
    expect(screen.getByText("Studio List")).toBeInTheDocument();
    expect(screen.getByText("Modern Software Development")).toBeInTheDocument();
    expect(screen.getByText("Cloud Engineering")).toBeInTheDocument();
    expect(screen.getByText("Data & AI")).toBeInTheDocument();
  });
});
