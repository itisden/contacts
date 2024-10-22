import { type Contact } from "../types";
import ContactItem from "./ContactItem";

const contacts: Contact[] = [
  {
    id: "john.doe@example.com",
    username: "john_doe",
    fullName: "John Doe",
    phoneNumber: "555-1234",
    email: "john.doe@example.com",
  },
  {
    id: "jane.smith@example.com",
    username: "jane_smith",
    fullName: "Jane Smith",
    phoneNumber: "555-5678",
    email: "jane.smith@example.com",
  },
  {
    id: "michael.jones@example.com",
    username: "michael_jones",
    fullName: "Michael Jones",
    phoneNumber: "555-8765",
    email: "michael.jones@example.com",
  },
  {
    id: "emily.brown@example.com",
    username: "emily_brown",
    fullName: "Emily Brown",
    phoneNumber: "555-3456",
    email: "emily.brown@example.com",
  },
  {
    id: "daniel.wilson@example.com",
    username: "daniel_wilson",
    fullName: "Daniel Wilson",
    phoneNumber: "555-9876",
    email: "daniel.wilson@example.com",
  },
  {
    id: "sarah.clark@example.com",
    username: "sarah_clark",
    fullName: "Sarah Clark",
    phoneNumber: "555-6543",
    email: "sarah.clark@example.com",
  },
  {
    id: "david.lee@example.com",
    username: "david_lee",
    fullName: "David Lee",
    phoneNumber: "555-4321",
    email: "david.lee@example.com",
  },
  {
    id: "laura.white@example.com",
    username: "laura_white",
    fullName: "Laura White",
    phoneNumber: "555-6789",
    email: "laura.white@example.com",
  },
  {
    id: "jason.taylor@example.com",
    username: "jason_taylor",
    fullName: "Jason Taylor",
    phoneNumber: "555-8764",
    email: "jason.taylor@example.com",
  },
  {
    id: "amanda.hill@example.com",
    username: "amanda_hill",
    fullName: "Amanda Hill",
    phoneNumber: "555-3452",
    email: "amanda.hill@example.com",
  },
];

const ContactListPage = () => {
  return (
    <div className="mx-auto max-w-screen-sm">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          data={contact}
          className="mt-3 first:mt-0"
        />
      ))}
    </div>
  );
};

export default ContactListPage;
