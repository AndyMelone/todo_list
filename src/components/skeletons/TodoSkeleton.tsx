import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export const TodoSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3 min-w-10 max-h-[400px] overflow-y-auto px-3 py-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          whileHover={{
            scale: 1.05,
          }}
        >
          <Skeleton className="h-9 py-2 rounded-lg bg-[#8c8c8c] mx-5" />
        </motion.div>
      ))}
    </div>
  );
};
