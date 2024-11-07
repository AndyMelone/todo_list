import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "./TodoForm";

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TodoDialog({ isOpen, onClose }: TodoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl w-full mx-1 md:w-1/2 lg:w-1/2 sm:mx-0">
        <DialogHeader>
          <DialogTitle>Ajouter une Todo</DialogTitle>
          <DialogDescription>
            Ajouter une nouvelle todo à votre liste
          </DialogDescription>
        </DialogHeader>
        <TodoForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
