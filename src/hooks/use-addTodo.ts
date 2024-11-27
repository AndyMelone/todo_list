import useTodoStore from "@/store/todoStore";
import { toast as sonner } from "sonner";
import useWindowSize from "./useWindowSize";
import { formatDate } from "@/utils/formatdate";
import toast from "react-hot-toast";
import { lang } from "@/store/fr";

export const useAddTodo = () => {
  const { loadTodos, addTodo, deleteTodo } = useTodoStore();

  const { width } = useWindowSize();

  const addTodoFunction = async (todoName: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    try {
      await addTodo({
        title: todoName,
        completed: false,
        updatedAt: new Date(),
        id: id,
      });
      if (width > 635) {
        sonner(lang.todos.addTodo.succes, {
          description: formatDate(new Date()),
          action: {
            label: lang.todos.cancel,
            onClick: async () => {
              await deleteTodo(id);
            },
          },
        });
      } else {
        toast.success(lang.todos.addTodo.succes);
      }

      loadTodos();
    } catch (error) {
      console.error(lang.todos.addTodo.errormsg, error);
      sonner(lang.todos.error, {
        description: lang.todos.addTodo.errormsg,
        action: {
          label: lang.todos.try,
          onClick: async () => {
            await addTodo({
              title: todoName,
              completed: false,
              updatedAt: new Date(),
              id: id,
            });
          },
        },
      });
    }
  };

  return { addTodoFunction };
};
