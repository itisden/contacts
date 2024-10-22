import { useNavigate } from "react-router-dom";
import { type Contact } from "@/domains/contacts/types";
import { useContact } from "@/domains/contacts/hooks/queries";
import { updateContact } from "@/firebase/contacts";
import { routes } from "@/router";
import ContactForm, { type SubmissionValues } from "../ContactForm";

type Props = {
  id: string;
};

const UpdateContactForm = ({ id }: Props) => {
  const { loading, data, error } = useContact(id);
  const navigate = useNavigate();

  const handleSave = async (values: SubmissionValues) => {
    try {
      await updateContact({
        id,
        ...values,
      });
      navigate(routes.home);
    } catch (e) {
      console.error(e);
      // TODO: handle error
    }
  };

  if (loading) return <span>Loading</span>;

  if (error) return <span>{error.message}</span>;

  return <ContactForm onSubmit={handleSave} contact={data as Contact} />;
};

export default UpdateContactForm;
