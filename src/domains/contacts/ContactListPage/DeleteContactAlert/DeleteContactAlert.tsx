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
import { Contact } from "@/domains/contacts/types";
import { useDeleteContact } from "@/domains/contacts/hooks/queries";

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
  const { loading, mutate } = useDeleteContact();

  const handleDelete = async () => {
    try {
      await mutate(contact.id);
      onDelete?.();
    } catch (e) {
      console.error(e);
      // TODO: handle error
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
