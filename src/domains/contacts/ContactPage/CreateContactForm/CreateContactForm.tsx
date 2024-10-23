import { useNavigate } from "react-router-dom";
import { type Contact } from "@/domains/contacts/types";
import ContactForm, { type SubmissionValues } from "../ContactForm";
import { createContact } from "@/firebase/contacts";
import { routes } from "@/router";
import { useState } from "react";
import { createEmptyContact } from "@/domains/contacts/utils/contact";
import { useToast } from "@/hooks/use-toast";
import { createErrorToastObject } from "@/utils/toasts";

const CreateContactForm = () => {
  const { toast } = useToast();
  const [contact] = useState<Contact>(() => createEmptyContact());
  const navigate = useNavigate();

  const handleSave = async (values: SubmissionValues) => {
    try {
      await createContact(values);
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

  return <ContactForm onSubmit={handleSave} contact={contact} />;
};

export default CreateContactForm;
