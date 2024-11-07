import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

describe("TodoList", () => {
  it(" List of todo ", () => {
    render(<Home />);
    expect(screen.findAllByRole("button"));
  });
});
