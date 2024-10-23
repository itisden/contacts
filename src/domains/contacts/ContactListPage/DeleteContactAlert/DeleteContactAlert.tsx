import { type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "@/domains/contacts/types";
import { useDeleteContact } from "@/domains/contacts/hooks/queries";
import { createErrorToastObject } from "@/utils/toasts";

type Props = {
  onDelete?: () => Promise<void>;
  onCancel?: () => void;
  children: ReactNode;
  contact: Contact;
};

const DeleteContactAlert = ({
  onDelete,
  onCancel,
  contact,
  children,
}: Props) => {
  const { toast } = useToast();
  const { loading, mutate } = useDeleteContact();

  const handleDelete = async () => {
    try {
      await mutate(contact.id);
      onDelete?.();
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        toast(createErrorToastObject(e.message));
      } else {
        toast(createErrorToastObject());
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <strong>{contact.fullName}</strong> contact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContactAlert;
