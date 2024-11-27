import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "./TodoForm";
import { lang } from "@/store/fr";

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoDialog({ isOpen, onClose }: TodoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl w-full md:w-1/2 lg:w-1/2 sm:mx-0">
        <DialogHeader>
          <DialogTitle>{lang.todos.addTodo.title}</DialogTitle>
          <DialogDescription>
            {lang.todos.addTodo.description}
          </DialogDescription>
        </DialogHeader>
        <TodoForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
