"use client";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { motion } from "framer-motion";
import useTodoStore from "@/store/todoStore";
import { lang } from "@/store/fr";
import dynamic from "next/dynamic";

const TodoDialog = dynamic(() => import("@/components/shared/todoDialogue"), {
  loading: () => <p>Loading...</p>,
});

const TodoList = dynamic(() => import("@/components/shared/todoList"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { todos } = useTodoStore();
  return (
    <div
      style={{
        background: "linear-gradient(to right, #707070 0%,  #b4b3bf 85%)",
      }}
      className="rounded-xl w-full md:w-1/2 mx-4 md:mx-0"
    >
      <div className="flex justify-between px-8 pt-3 pb-5 items-center">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
          {lang.todos.todo} ({todos.length})
        </h1>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <button
            id="addTodo"
            aria-label="add todo"
            className="hover:opacity-80"
            onClick={() => setIsDialogOpen(true)}
          >
            <IoMdAddCircle className="text-[32px] md:text-[40px]" />
          </button>
        </motion.div>
      </div>
      <TodoList />
      <TodoDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
