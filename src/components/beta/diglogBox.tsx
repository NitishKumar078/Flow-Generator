import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alpha/alert-dialog";

interface DialogBoxProps {
  message: string;
  title?: string;
  tigger: boolean;
  closeer?: (open: boolean) => void;
}

export default function DialogBox({
  message,
  title = "Are you absolutely sure?",
  tigger,
  closeer,
}: DialogBoxProps) {
  return (
    <AlertDialog open={tigger} onOpenChange={closeer}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
          {/* <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
