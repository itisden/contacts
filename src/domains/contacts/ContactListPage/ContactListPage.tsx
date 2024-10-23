import { useContacts } from "@/domains/contacts/hooks/queries";
import ContactItem from "./ContactItem";

const ContactListPage = () => {
  const { isLoading, data, error } = useContacts();

  return (
    <div className="mx-auto max-w-screen-sm">
      {isLoading && <span>Loading</span>}
      {error && <span>{error.message}</span>}
      {data?.map((contact) => (
        <ContactItem
          key={contact.id}
          className="mt-3 first:mt-0"
          data={contact}
        />
      ))}
    </div>
  );
};

export default ContactListPage;
