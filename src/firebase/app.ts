import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { firebase } from "@/config";

const app = initializeApp(firebase);

export const firestore = getFirestore(app);
