import React from "react";
import { Reorder, motion } from "framer-motion";
import { useTodos } from "@/hooks/useTodos";

import { TodoItem } from "./todoItem";
import { TodoSkeleton } from "../skeletons/TodoSkeleton";
import { EmptyTodo } from "../EmptyComponents/EmptyTodo";

const MotionTodo = motion.create(TodoItem);

export const TodoList = () => {
  const { todos, loading, handleDelete, handleStatusChange } = useTodos();

  if (loading) {
    return <TodoSkeleton />;
  }

  if (todos.length === 0) {
    return <EmptyTodo message="Aucune todo à afficher" />;
  }

  return (
    <Reorder.Group
      as="div"
      axis="y"
      values={todos}
      onReorder={() => {}}
      className="space-y-3 min-w-10 max-h-[400px] overflow-y-auto py-4 pb-5 px-8"
    >
      {todos.map((todo) => (
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
            onDeleted={() => handleDelete(todo)}
            onStatusChanged={() => handleStatusChange(todo.id)}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
