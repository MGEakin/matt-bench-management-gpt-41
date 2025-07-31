import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Practice } from "../../../types/practice";
import { Studio } from "../../../types/studio";
const practices: Practice[] = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Design" },
  { id: 3, name: "Strategy" },
];
const studios: Studio[] = [
  { id: 1, name: "NY" },
  { id: 2, name: "SF" },
  { id: 3, name: "London" },
];
vi.stubGlobal('fetch', (url: string) => {
  if (url.includes('/api/practices')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(practices),
    });
  }
  if (url.includes('/api/studios')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(studios),
    });
  }
  return Promise.reject(new Error('Unknown endpoint'));
});
import EmployeeFilter from "../EmployeeFilter";

import { create } from "react-test-renderer";

describe("EmployeeFilter", () => {
  it("renders filter inputs, studio dropdown, and practice dropdown", async () => {
    render(<EmployeeFilter filters={{}} onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Filter by name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter by title")).toBeInTheDocument();
    // Wait for studios and practices to load
    await waitFor(() => {
      const selects = screen.getAllByRole("combobox");
      expect(selects.length).toBe(2);
      expect(selects[0]).toHaveDisplayValue("Filter by studio");
      expect(selects[1]).toHaveDisplayValue("Filter by practice");
    });
    for (const studio of studios) {
      expect(screen.getByRole("option", { name: studio.name })).toBeInTheDocument();
    }
    for (const practice of practices) {
      expect(screen.getByRole("option", { name: practice.name })).toBeInTheDocument();
    }
  });

  it("calls onChange when input values change including studio dropdown", async () => {
    const onChange = vi.fn();
    render(<EmployeeFilter filters={{}} onChange={onChange} />);
    const nameInput = screen.getByPlaceholderText("Filter by name");
    const titleInput = screen.getByPlaceholderText("Filter by title");
    // Wait for studios and practices to load
    let selects: HTMLElement[] = [];
    await waitFor(() => {
      selects = screen.getAllByRole("combobox");
      expect(selects.length).toBe(2);
    });
    fireEvent.change(nameInput, { target: { value: "John" } });
    fireEvent.change(titleInput, { target: { value: "Manager" } });
    fireEvent.change(selects[0], { target: { value: "NY" } });
    fireEvent.change(selects[1], { target: { value: "Engineering" } });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("renders with all filters applied including studio and practice", async () => {
    render(
      <EmployeeFilter
        filters={{ name: "Alice", title: "QA", studio: "NY", practice: "Design" }}
        onChange={() => {}}
      />,
    );
    expect(screen.getByDisplayValue("Alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("QA")).toBeInTheDocument();
    // Wait for studios and practices to load
    let selects: HTMLElement[] = [];
    await waitFor(() => {
      selects = screen.getAllByRole("combobox");
      expect(selects.length).toBe(2);
      expect(selects[0]).toHaveValue("NY");
      expect(selects[1]).toHaveValue("Design");
    });
  });

  it("matches snapshot", async () => {
    const tree = create(
      <EmployeeFilter filters={{}} onChange={() => {}} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has accessible form", async () => {
    render(<EmployeeFilter filters={{}} onChange={() => {}} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2);
    selects.forEach(select => expect(select).toBeInTheDocument());
  });
});
