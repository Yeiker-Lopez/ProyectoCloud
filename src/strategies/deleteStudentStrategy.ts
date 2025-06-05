import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const deleteStudentStrategy = async (id: string) => {
  await deleteDoc(doc(db, "estudiantes", id));
};
