import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { lang } from "@/store/fr";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

const TodoForm = dynamic(() => import("./TodoForm"), {
  loading: () => <div>Loading...</div>,
});

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const TodoDialog = memo(({ isOpen, onClose }: TodoDialogProps) => {
  const title = useMemo(() => lang.todos.addTodo.title, []);
  const description = useMemo(() => lang.todos.addTodo.description, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl w-full md:w-1/2 lg:w-1/2 sm:mx-0">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <TodoForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
});

TodoDialog.displayName = "TodoDialog";

export default TodoDialog;
