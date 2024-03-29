import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { User } from "firebase/auth";

export const addUserToDatabase = async (user: User) => {
  // simply add all user info to database

  try {
    const userRef = doc(db, "users", user.uid);

    await setDoc(userRef, {
      id: user.uid,
      name: user.displayName || null,
      email: user.email,
      profileImg: user.photoURL || "",
      dateAdded: serverTimestamp(),
    });

    return "done";
  } catch (error) {
    console.log(error);
  }
};
