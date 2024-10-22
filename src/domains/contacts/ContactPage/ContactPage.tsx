import { useParams } from "react-router-dom";
import UpdateContactForm from "./UpdateContactForm";
import CreateContactForm from "./CreateContactForm";

const ContactPage = () => {
  const { contactId } = useParams();

  return contactId ? (
    <UpdateContactForm id={contactId} />
  ) : (
    <CreateContactForm />
  );
};

export default ContactPage;
