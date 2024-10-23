import { useCallback } from "react";
import { getContacts, getContact, deleteContact } from "@/firebase/contacts";
import useFetch from "@/hooks/useFetch";
import useMutation from "@/hooks/useMutation";

// TODO: replace query hooks with react-query

export const useContacts = () => {
  return useFetch(getContacts);
};

export const useContact = (id: string) => {
  const getContactCallback = useCallback(() => getContact(id), [id]);
  return useFetch(getContactCallback);
};

export const useDeleteContact = () => {
  return useMutation(deleteContact);
};
