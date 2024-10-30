import axios from "@/utils/axios";
import { type Contact, type ContactWithoutId } from "@/domains/contacts/types";

export const getContacts = async (): Promise<Contact[]> => {
  return axios.get<Contact[]>("/contacts").then((response) => response.data);
};

export const getContact = async (id: string): Promise<Contact> => {
  return axios
    .get<Contact>(`/contacts/${id}`)
    .then((response) => response.data);
};

export const createContact = async (
  contact: ContactWithoutId,
): Promise<Contact> => {
  return axios
    .post<Contact>("/contacts", contact)
    .then((response) => response.data);
};

export const updateContact = async (contact: Contact): Promise<Contact> => {
  const { id, ...contactData } = contact;
  return axios
    .put<Contact>(`/contacts/${id}`, contactData)
    .then((response) => response.data);
};

export const deleteContact = async (id: string): Promise<void> => {
  return axios.delete(`/contacts/${id}`);
};
