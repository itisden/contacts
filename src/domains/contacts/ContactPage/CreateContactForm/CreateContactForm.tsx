import { useNavigate } from "react-router-dom";
import { type Contact } from "@/domains/contacts/types";
import ContactForm, { type SubmissionValues } from "../ContactForm";
import { routes } from "@/router";
import { useState } from "react";
import { createEmptyContact } from "@/domains/contacts/utils/contact";
import { useAddContact } from "@/domains/contacts/hooks/queries";
import { genericErrorHandler } from "@/utils/errorHandlers";

const CreateContactForm = () => {
  const { mutateAsync } = useAddContact();
  const [contact] = useState<Contact>(() => createEmptyContact());
  const navigate = useNavigate();

  const handleSave = async (values: SubmissionValues) => {
    try {
      await mutateAsync(values);
      navigate(routes.home);
    } catch (e) {
      genericErrorHandler(e);
    }
  };

  return <ContactForm onSubmit={handleSave} contact={contact} />;
};

export default CreateContactForm;
