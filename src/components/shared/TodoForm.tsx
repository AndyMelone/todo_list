import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "../ui/dialog";
import useTodoStore from "@/store/todoStore";
import { motion } from "framer-motion";

interface TodoFormProps {
  onClose: () => void;
}

export default function TodoForm({ onClose }: TodoFormProps) {
  const { toast } = useToast();
  const { loadTodos, addTodo } = useTodoStore();
  const [todoName, setTodoName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await addTodo({
        title: todoName,
        completed: false,
        updatedAt: new Date(),
        id: Math.random().toString(36).substr(2, 9),
      });

      if (response) {
        toast({
          title: "Todo ajoutée 🎉",
          description: `La todo "${todoName.slice(0, 20)}" a bien été ajoutée`,
        });
        setTodoName("");
        onClose();
        loadTodos();
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col gap-4">
          <Label htmlFor="name" className="text-start">
            Intitulé de la todo to{" "}
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
          <Button type="submit">Ajouter</Button>
        </motion.div>
      </DialogFooter>
    </form>
  );
}
