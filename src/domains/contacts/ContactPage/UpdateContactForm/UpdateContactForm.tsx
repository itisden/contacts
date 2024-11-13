import { useNavigate } from "react-router-dom";
import { type Contact } from "@/domains/contacts/types";
import { useContact } from "@/domains/contacts/hooks/queries";
import { routes } from "@/router";
import { useUpdateContact } from "@/domains/contacts/hooks/queries";
import { genericErrorHandler } from "@/utils/errorHandlers";
import ContactForm, { type SubmissionValues } from "../ContactForm";

type Props = {
  id: string;
};

const UpdateContactForm = ({ id }: Props) => {
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
      genericErrorHandler(e);
    }
  };

  if (isLoading) return <span>Loading</span>;

  if (error) return <span>{error?.message || JSON.stringify(error)}</span>;

  return <ContactForm onSubmit={handleSave} contact={data as Contact} />;
};

export default UpdateContactForm;
