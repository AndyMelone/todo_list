import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { motion } from "framer-motion";
import { useAddTodo } from "@/hooks/use-addTodo";
import { lang } from "@/store/fr";

interface TodoFormProps {
  onClose: () => void;
}

export default function TodoForm({ onClose }: TodoFormProps) {
  const [todoName, setTodoName] = useState<string>("");
  const { addTodoFunction } = useAddTodo();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!todoName.trim()) return;

    await addTodoFunction(todoName);
    setTodoName("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-start">
            {lang.todos.addTodo.inputLabel}
          </Label>
          <Input
            id="name"
            className="col-span-3"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Button aria-labelledby="soumetre" type="submit" id="submit">
            {lang.todos.add}
          </Button>
        </motion.div>
      </DialogFooter>
    </form>
  );
}
