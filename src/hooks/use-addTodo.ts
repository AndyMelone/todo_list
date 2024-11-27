import useTodoStore from "@/store/todoStore";
import { toast as sonner } from "sonner";
import useWindowSize from "./useWindowSize";
import { formatDate } from "@/utils/formatdate";
import toast from "react-hot-toast";

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
        sonner("Todo ajoutée 🎉", {
          description: formatDate(new Date()),
          action: {
            label: "Annuler",
            onClick: async () => {
              await deleteTodo(id);
            },
          },
        });
      } else {
        toast.success("Todo ajoutée 🎉");
      }

      loadTodos();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la todo", error);
      sonner("  Erreur ❌", {
        description: "Une erreur est survenue lors de l'ajout de la todo.",
        action: {
          label: "Réesayer",
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
