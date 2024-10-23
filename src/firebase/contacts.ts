import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { firestore } from "@/firebase/app";
import { Contact } from "@/domains/contacts/types";

const CONTACTS_COLLECTION = "contacts";

export const getContacts = async (): Promise<Contact[]> => {
  const querySnapshot = await getDocs(
    collection(firestore, CONTACTS_COLLECTION),
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Contact[];
};

export const getContact = async (id: string): Promise<Contact> => {
  const docRef = doc(firestore, CONTACTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Contact;
  } else {
    throw Error(`${id} not found`);
  }
};

export const createContact = async (contact: Omit<Contact, "id">) => {
  await addDoc(collection(firestore, CONTACTS_COLLECTION), contact);
};

export const updateContact = async (contact: Contact) => {
  const { id, ...contactData } = contact;
  const docRef = doc(firestore, CONTACTS_COLLECTION, id);
  await updateDoc(docRef, contactData);
};

export const deleteContact = async (id: string) => {
  const docRef = doc(firestore, CONTACTS_COLLECTION, id);
  await deleteDoc(docRef);
};
