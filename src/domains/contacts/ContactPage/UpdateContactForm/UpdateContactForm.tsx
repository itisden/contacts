import { useNavigate } from "react-router-dom";
import { type Contact } from "@/domains/contacts/types";
import { useContact } from "@/domains/contacts/hooks/queries";
import { routes } from "@/router";
import { useToast } from "@/hooks/use-toast";
import { createErrorToastObject } from "@/utils/toasts";
import { useUpdateContact } from "@/domains/contacts/hooks/queries";
import ContactForm, { type SubmissionValues } from "../ContactForm";

type Props = {
  id: string;
};

const UpdateContactForm = ({ id }: Props) => {
  const { toast } = useToast();
  const { mutateAsync } = useUpdateContact();
  const { isLoading, data, error } = useContact(id);
  const navigate = useNavigate();

  const handleSave = async (values: SubmissionValues) => {
    try {
      await mutateAsync({
        id,
        ...values,
      });
      navigate(routes.home);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        toast(createErrorToastObject(e.message));
      } else {
        toast(createErrorToastObject());
      }
    }
  };

  if (isLoading) return <span>Loading</span>;

  if (error) return <span>{error?.message || JSON.stringify(error)}</span>;

  return <ContactForm onSubmit={handleSave} contact={data as Contact} />;
};

export default UpdateContactForm;
