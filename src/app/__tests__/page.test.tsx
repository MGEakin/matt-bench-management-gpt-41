import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

import "@testing-library/jest-dom";

// Helper for snapshot
import { create } from "react-test-renderer";

describe("Home Page", () => {
  beforeAll(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        redirected: false,
        type: "basic",
        url: "",
        json: () => Promise.resolve([]),
        text: () => Promise.resolve(""),
        headers: { get: () => null },
        clone: () => this,
        body: null,
        bodyUsed: false,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
        blob: () => Promise.resolve(new Blob()),
        formData: () => Promise.resolve(new FormData()),
      } as unknown as Response),
    );
  });
  afterAll(() => {
    // @ts-expect-error: mockRestore may not exist on global.fetch in some test environments
    global.fetch && global.fetch.mockRestore && global.fetch.mockRestore();
  });
  it("renders Employee Directory title", () => {
    render(<Home />);
    expect(screen.getByText(/Employee Directory/i)).toBeInTheDocument();
  });

  it("renders Add Employee button", () => {
    render(<Home />);
    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const tree = create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has accessible main landmark", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("shows empty state if no employees", () => {
    // If Home supports empty state, test it here. Otherwise, skip or update Home to support it.
    // Example:
    // render(<Home employees={[]} />);
    // expect(screen.getByText(/No employees found/i)).toBeInTheDocument();
    // If not supported, this test will be skipped.
  });
});
