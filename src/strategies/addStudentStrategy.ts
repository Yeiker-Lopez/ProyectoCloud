import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { IEstudiante } from "../interfaces/IEstudiantes";

export const addStudentStrategy = async (newStudent: Partial<IEstudiante>) => {
  const docRef = await addDoc(collection(db, "estudiantes"), newStudent);
  return { id: docRef.id, ...newStudent } as IEstudiante;
};
