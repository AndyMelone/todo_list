import React from "react";
import { motion } from "framer-motion";

export const EmptyTodo = ({ message }: { message: string }) => (
  <motion.div
    className="flex items-center justify-center w-full h-full"
    initial={{ x: -100, y: -100 }}
    animate={{ x: 0, y: 0 }}
  >
    <h1 className="text-lg text-white">{message}</h1>
  </motion.div>
);
