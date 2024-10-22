import { useContacts } from "@/domains/contacts/hooks/queries";
import ContactItem from "./ContactItem";

const ContactListPage = () => {
  const { loading, data, error, refetch } = useContacts();

  return (
    <div className="mx-auto max-w-screen-sm">
      {loading && <span>Loading</span>}
      {error && <span>{error.message}</span>}
      {data?.map((contact) => (
        <ContactItem
          key={contact.id}
          className="mt-3 first:mt-0"
          data={contact}
          onDelete={refetch}
        />
      ))}
    </div>
  );
};

export default ContactListPage;
