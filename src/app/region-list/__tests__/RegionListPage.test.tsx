import React from "react";
import { render, screen } from "@testing-library/react";
import RegionListTable from "../RegionListTable";

describe("RegionListTable", () => {
  it("renders a table of regions", () => {
    const regions = [
      { id: 1, name: "Global" },
      { id: 2, name: "North America" },
      { id: 3, name: "Europe" },
    ];
    render(<RegionListTable regions={regions} />);
    expect(screen.getByText("Region List")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
    expect(screen.getByText("North America")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
  });
});
