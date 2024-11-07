import React, { useEffect, useState } from "react";
import { TodoItem } from "./todoItem";
import { useToast } from "@/hooks/use-toast";
import useTodoStore from "@/store/todoStore";
import { motion, Reorder } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const MotionTodo = motion(TodoItem);

export default function TodoList() {
  const { toast } = useToast();
  const { todos, loadTodos, deleteTodo, updateTodoStatus } = useTodoStore();
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
    if (success) {
      toast({
        title: "Succès",
        description: "Todo supprimée avec succès",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la todo",
      });
    }
  };

  const handleStatusChanged = async (id: string) => {
    const success = await updateTodoStatus(
      id,
      !todos.find((todo) => todo.id === id)?.completed
    );
    if (success) {
      toast({
        title: "Succès",
        description: "Statut de la todo modifié avec succès",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de la todo",
      });
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return a.completed ? 1 : -1;
  });

  if (loading) {
    return (
      <div className="space-y-3 min-w-10 max-h-[400px] overflow-x-auto w-full px-3 py-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 rounded-lg bg-gray-300" />
        ))}
      </div>
    );
  }

  return sortedTodos.length === 0 ? (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-lg text-white">Aucune todo à afficher</h1>
    </div>
  ) : (
    <Reorder.Group
      as="div"
      axis="y"
      values={sortedTodos}
      onReorder={() => {}}
      className="space-y-3 min-w-10 max-h-[400px] overflow-x-auto w-full px-3 py-4"
    >
      {sortedTodos.map((todo) => (
        <Reorder.Item key={todo.id} value={todo}>
          <MotionTodo
            key={todo.id}
            whileHover={{ scale: 1.05 }}
            title={todo.title}
            completed={todo.completed}
            onDeleted={() => handleDelete(todo.id)}
            onStatusChanged={() => handleStatusChanged(todo.id)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
