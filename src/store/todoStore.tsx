import { create } from "zustand";
import { TodoInterface } from "@/types/todo";

interface TodoState {
  todos: TodoInterface[];

  loadTodos: () => Promise<void>;
  addTodo: (todo: TodoInterface) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  updateTodoStatus: (id: string, completed: boolean) => Promise<boolean>;
}

const JSON_SERVER_URL = `${process.env.NEXT_PUBLIC_JSON_SERVER_HOST}:${process.env.NEXT_PUBLIC_JSON_SERVER_PORT}/todos`;

const useTodoStore = create<TodoState>(
  (set: (fn: (state: TodoState) => TodoState) => void) => ({
    todos: [],

    loadTodos: async () => {
      try {
        if (!JSON_SERVER_URL) {
          console.error("API URL is not defined");
          return;
        }

        const response = await fetch(JSON_SERVER_URL);
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
        if (!JSON_SERVER_URL) {
          console.error("API URL is not defined");
          return false;
        }

        const response = await fetch(JSON_SERVER_URL, {
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
        if (!JSON_SERVER_URL) {
          console.error("API URL is not defined");
          return false;
        }
        const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
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
        if (!JSON_SERVER_URL) {
          console.error("API URL is not defined");
          return false;
        }
        const response = await fetch(`${JSON_SERVER_URL}/${id}`, {
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
