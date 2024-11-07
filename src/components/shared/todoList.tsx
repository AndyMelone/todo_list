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
      // clean scale
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
      <div className="space-y-3 min-w-10 max-h-[400px] overflow-y-auto px-3 py-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
            }}
          >
            <Skeleton className="h-9  py-2 rounded-lg bg-[#8c8c8c] mx-5" />
          </motion.div>
        ))}
      </div>
    );
  }

  return sortedTodos.length === 0 ? (
    <motion.div
      className="flex items-center justify-center w-full h-full"
      initial={{ x: -100, y: -100 }}
      animate={{ x: 0, y: 0 }}
    >
      <h1 className="text-lg text-white">Aucune todo à afficher</h1>
    </motion.div>
  ) : (
    <Reorder.Group
      as="div"
      axis="y"
      values={sortedTodos}
      onReorder={() => {}}
      className="space-y-3 min-w-10 max-h-[400px] overflow-y-auto py-4 pb-5 px-8"
      initial={{ y: -100 }}
      onDurationChange={(duration) => duration}
      animate={{ x: 0, y: 0 }}
    >
      {sortedTodos.map((todo) => (
        <Reorder.Item key={todo.id} value={todo}>
          <MotionTodo
            key={todo.id}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
