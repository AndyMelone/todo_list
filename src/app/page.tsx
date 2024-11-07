"use client";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import TodoDialog from "@/components/shared/todoDialogue";
import TodoList from "@/components/shared/todoList";
import { motion } from "framer-motion";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #707070 0%,  #b4b3bf 85%)",
      }}
      className="rounded-xl w-full md:w-1/2 lg:w-1/2  mx-4 md:mx-0"
    >
      <div className="flex justify-between px-8 pt-3 pb-5 items-center">
        <h1 className="sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
          Todos
        </h1>
        <motion.div whileHover={{ scale: 1.1 }}>
          <button
            className="hover:opacity-80"
            onClick={() => setIsDialogOpen(true)}
          >
            <IoMdAddCircle className="text-[32px] md:text-[40px]" />
          </button>
        </motion.div>
      </div>
      <div className="pb-5 mx-5">
        <TodoList />
      </div>
      <div className="px-2">
        <TodoDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
}
