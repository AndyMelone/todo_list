import { create } from "zustand";
import { TodoInterface } from "@/types/todo";

const url = "http://localhost:3001/todos";

interface TodoState {
  todos: TodoInterface[];

  loadTodos: () => Promise<void>;
  addTodo: (todo: TodoInterface) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  updateTodoStatus: (id: string, completed: boolean) => Promise<boolean>;
}

const useTodoStore = create<TodoState>(
  (set: (fn: (state: TodoState) => TodoState) => void) => ({
    todos: [],

    loadTodos: async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const todos = await response.json();
          set((state) => ({ ...state, todos }));
        } else {
          console.error("Erreur réseau", response.statusText);
        }
      } catch (error) {
        console.error("Erreur réseau", error);
      }
    },

    addTodo: async (todo: TodoInterface) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        });
        if (response.ok) {
          const newTodo = await response.json();
          set((state) => ({
            ...state,
            todos: [...state.todos, newTodo],
          }));
          return true;
        } else {
          console.error("Erreur réseau", response.statusText);
          return false;
        }
      } catch (error) {
        console.error("Erreur réseau", error);
        return false;
      }
    },

    deleteTodo: async (id: string) => {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          set((state) => ({
            ...state,
            todos: state.todos.filter((todo) => todo.id !== id),
          }));
          return true;
        } else {
          console.error("Erreur réseau", response.statusText);
          return false;
        }
      } catch (error) {
        console.error("Erreur réseau", error);
        return false;
      }
    },

    updateTodoStatus: async (id: string, completed: boolean) => {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        });
        if (response.ok) {
          set((state) => ({
            ...state,
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed } : todo
            ),
          }));
          return true;
        } else {
          console.error("Erreur réseau", response.statusText);
          return false;
        }
      } catch (error) {
        console.error("Erreur réseau", error);
        return false;
      }
    },
  })
);

export default useTodoStore;
