import { Checkbox } from "@/components/ui/checkbox";
import { forwardRef } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { motion } from "framer-motion";

interface TodoItemProps {
  title: string;
  completed: boolean;
  onStatusChanged: () => void;
  onDeleted: () => void;
}

export const TodoItem = forwardRef<HTMLDivElement, TodoItemProps>(
  ({ title, completed, onStatusChanged, onDeleted }, ref) => {
    return (
      <motion.div>
        <div
          ref={ref}
          className="flex justify-between items-center w-full px-2 py-2 rounded-lg bg-[#8c8c8c] group"
        >
          <div className="flex items-center justify-center space-x-2">
            <Checkbox
              id="terms"
              checked={completed}
              onClick={onStatusChanged}
            />
            <label
              className={`text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                completed ? "line-through" : ""
              }`}
            >
              {title}
            </label>
          </div>
          <button
            onClick={onDeleted}
            className="mr-2 opacity-100 sm:opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity sm:transition-all"
          >
            <IoTrashOutline className="w-4 h-4 text-red-600 hover:text-red-500 focus:text-red-700  " />
          </button>
        </div>
      </motion.div>
    );
  }
);

TodoItem.displayName = "TodoItem";
