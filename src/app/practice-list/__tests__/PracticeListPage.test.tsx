import React from "react";
import { render, screen } from "@testing-library/react";
import PracticeListTable from "../PracticeListTable";

describe("PracticeListTable", () => {
  it("renders a table of practices", () => {
    const practices = [
      { id: 1, name: "Development" },
      { id: 2, name: "Design" },
      { id: 3, name: "Strategy" },
    ];
    render(<PracticeListTable practices={practices} />);
    expect(screen.getByText("Practice List")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("Strategy")).toBeInTheDocument();
  });
});
