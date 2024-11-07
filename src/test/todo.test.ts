import { expect, test, beforeEach, vi } from "vitest";
import useTodoStore from "../store/todoStore";

const todoTest = {
  id: "1A",
  title: "Unit test of todo",
  completed: false,
  updatedAt: new Date(),
};

const url = "http://localhost:3001/todos";

beforeEach(() => {
  vi.clearAllMocks();
});

test("loadTodos should fetch and load todos", async () => {
  const mockTodos = [todoTest];
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
  });

  const store = useTodoStore.getState();
  await store.loadTodos();

  expect(store.todos).toEqual(mockTodos);
  expect(global.fetch).toHaveBeenCalledWith(url);
});

test("addTodo should add a new todo", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => todoTest,
  });

  const store = useTodoStore.getState();
  const success = await store.addTodo(todoTest);

  expect(success).toBe(true);
  expect(store.todos).toContainEqual(todoTest);
  expect(global.fetch).toHaveBeenCalledWith(url, expect.any(Object));
});

test("updateTodoStatus should update the status of a todo", async () => {
  const updatedTodo = { ...todoTest, completed: true };
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => updatedTodo,
  });

  const store = useTodoStore.getState();
  store.todos = [todoTest]; // Initialise le store avec un todo
  const success = await store.updateTodoStatus(todoTest.id, true);

  expect(success).toBe(true);
  expect(store.todos.find((t) => t.id === todoTest.id)?.completed).toBe(true);
  expect(global.fetch).toHaveBeenCalledWith(
    `${url}/${todoTest.id}`,
    expect.any(Object)
  );
});

test("deleteTodo should remove a todo", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
  });

  const store = useTodoStore.getState();
  store.todos = [todoTest]; // Initialise le store avec un todo
  const success = await store.deleteTodo(todoTest.id);

  expect(success).toBe(true);
  expect(store.todos.find((t) => t.id === todoTest.id)).toBeUndefined();
  expect(global.fetch).toHaveBeenCalledWith(
    `${url}/${todoTest.id}`,
    expect.any(Object)
  );
});
