import { useState, useEffect } from "react";
import useTodoStore from "@/store/todoStore";
import { useToast } from "@/hooks/use-toast";

export const useTodos = () => {
  const { todos, loadTodos, deleteTodo, updateTodoStatus } = useTodoStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      await loadTodos();
      setLoading(false);
    };
    fetchTodos();
  }, [loadTodos]);

  const handleDelete = async (id: string) => {
    const success = await deleteTodo(id);
    toast({
      title: success ? "Succès" : "Erreur",
      description: success
        ? "Todo supprimée avec succès"
        : "Impossible de supprimer la todo",
    });
  };

  const handleStatusChange = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const success = await updateTodoStatus(id, !todo.completed);
    toast({
      title: success ? "Succès" : "Erreur",
      description: success
        ? "Statut de la todo modifié avec succès"
        : "Impossible de modifier le statut",
    });
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return a.completed ? 1 : -1;
  });

  return { todos: sortedTodos, loading, handleDelete, handleStatusChange };
};
