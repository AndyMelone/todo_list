import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DialogFooter } from "../ui/dialog";
import useTodoStore from "@/store/todoStore";

interface TodoFormProps {
  onClose: () => void;
}

export default function TodoForm({ onClose }: TodoFormProps) {
  const { toast } = useToast();
  const { loadTodos } = useTodoStore();
  const [todoName, setTodoName] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todoName,
          completed: false,
          updatedAt: new Date(),
        }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        toast({
          title: "Todo ajoutée",
          description: `La todo "${newTodo.title}" a bien été ajoutée`,
        });
        setTodoName("");
        onClose();
        loadTodos();
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'ajout de la todo",
        });
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
            Intitulé de la todo
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
        <Button type="submit">Ajouter</Button>
      </DialogFooter>
    </form>
  );
}
