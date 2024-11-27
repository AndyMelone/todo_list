import { useState, useEffect } from "react";
import useTodoStore from "@/store/todoStore";
import { toast as sonner } from "sonner";
import useWindowSize from "./useWindowSize";
import { formatDate } from "@/utils/formatdate";
import toast from "react-hot-toast";
import { TodoInterface } from "@/types/todo";
import { lang } from "@/store/fr";

export const useTodos = () => {
  const { todos, addTodo, loadTodos, deleteTodo, updateTodoStatus } =
    useTodoStore();

  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      await loadTodos();
      setLoading(false);
    };
    fetchTodos();
  }, [loadTodos]);

  const handleDelete = async (todo: TodoInterface) => {
    const success = await deleteTodo(todo.id);

    if (width > 635) {
      sonner(success ? lang.todos.deleteTodo.succes : lang.todos.oopsmsg, {
        description: success
          ? formatDate(new Date())
          : lang.todos.deleteTodo.errormsg,
        action: {
          label: lang.todos.cancel,
          onClick: async () =>
            addTodo({
              title: todo.title,
              completed: false,
              updatedAt: new Date(),
              id: todo.id,
            }),
        },
      });
    } else {
      toast.success(
        success ? lang.todos.deleteTodo.succes : lang.todos.oopsmsg
      );
    }
  };

  const handleStatusChange = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const success = await updateTodoStatus(id, !todo.completed);
    if (width > 635) {
      sonner(
        success ? lang.todos.updateTodoStatus.succes : lang.todos.oopsmsg,
        {
          description: success
            ? formatDate(new Date())
            : lang.todos.updateTodoStatus.error,
        }
      );
    } else {
      toast.success(
        success ? lang.todos.updateTodoStatus.succes : lang.todos.oopsmsg
      );
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return { todos: sortedTodos, loading, handleDelete, handleStatusChange };
};
