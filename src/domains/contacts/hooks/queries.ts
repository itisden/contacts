import {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact,
} from "@/domains/contacts/api/contacts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const CONTACTS = "contacts";

export const useContacts = () => {
  return useQuery({ queryKey: [CONTACTS], queryFn: getContacts });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: [CONTACTS, id],
    queryFn: () => getContact(id),
  });
};

export const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTACTS] });
    },
  });
};
