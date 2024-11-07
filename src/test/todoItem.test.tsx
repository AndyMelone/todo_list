import React from "react";
import { TodoItem } from "@/components/shared/todoItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("TodoItem", () => {
  it("affiche le titre et l'état complété", () => {
    render(
      <TodoItem
        title="Acheter du lait"
        completed={true}
        onStatusChanged={() => {}}
        onDeleted={() => {}}
      />
    );

    expect(screen.getByText("Acheter du lait")).toBeInTheDocument();
    expect(screen.getByText("Acheter du lait")).toHaveClass("line-through");
  });

  it("appelle `onStatusChanged` lors du clic sur la case à cocher", () => {
    const onStatusChanged = vi.fn();
    render(
      <TodoItem
        title="Acheter du lait"
        completed={false}
        onStatusChanged={onStatusChanged}
        onDeleted={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(onStatusChanged).toHaveBeenCalledTimes(1);
  });

  it("appelle `onDeleted` lors du clic sur le bouton de suppression", () => {
    const onDeleted = vi.fn();
    render(
      <TodoItem
        title="Acheter du lait"
        completed={false}
        onStatusChanged={() => {}}
        onDeleted={onDeleted}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onDeleted).toHaveBeenCalledTimes(1);
  });
});
