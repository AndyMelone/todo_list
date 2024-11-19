import useTodoStore from "@/store/todoStore";
import { useToast } from "./use-toast";

export const useAddTodo = () => {
  const { loadTodos, addTodo } = useTodoStore();
  const { toast } = useToast();

  const addTodoFunction = async (todoName: string) => {
    try {
      await addTodo({
        title: todoName,
        completed: false,
        updatedAt: new Date(),
        id: Math.random().toString(36).substr(2, 9),
      });
      toast({
        title: "Todo ajoutée 🎉",
        description: `La todo "${todoName.slice(0, 20)}" a bien été ajoutée`,
      });
      loadTodos();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la todo", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la todo.",
        variant: "destructive",
      });
    }
  };

  return { addTodoFunction };
};
