import React from "react";
import { render, screen } from "@testing-library/react";
import LocationListTable from "../LocationListTable";

describe("LocationListTable", () => {
  it("renders a table of locations", () => {
    const locations = [
      { id: 1, name: "Remote" },
      { id: 2, name: "Onsite" },
      { id: 3, name: "Hybrid" },
    ];
    render(<LocationListTable locations={locations} />);
    expect(screen.getByText("Location List")).toBeInTheDocument();
    expect(screen.getByText("Remote")).toBeInTheDocument();
    expect(screen.getByText("Onsite")).toBeInTheDocument();
    expect(screen.getByText("Hybrid")).toBeInTheDocument();
  });
});
