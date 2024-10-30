export interface Contact {
  id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string;
}

export type ContactWithoutId = Omit<Contact, "id">;
