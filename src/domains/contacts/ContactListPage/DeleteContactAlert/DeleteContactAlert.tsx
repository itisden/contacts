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
import { genericErrorHandler } from "@/utils/errorHandlers";

type Props = {
  onCancel?: () => void;
  children: ReactNode;
  contact: Contact;
};

const DeleteContactAlert = ({ onCancel, contact, children }: Props) => {
  const { isPending, mutateAsync } = useDeleteContact();

  const handleDelete = async () => {
    try {
      await mutateAsync(contact.id);
    } catch (e) {
      genericErrorHandler(e);
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
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteContactAlert;
