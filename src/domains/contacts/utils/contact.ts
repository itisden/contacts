import { Contact } from "@/domains/contacts/types";

export const getInitials = (fullName: string): string => {
  return fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const createEmptyContact = (): Contact => ({
  id: "",
  username: "",
  fullName: "",
  phoneNumber: "",
  email: "",
});
