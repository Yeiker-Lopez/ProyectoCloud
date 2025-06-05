import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { IEstudiante } from "../interfaces/IEstudiantes";

export const updateStudentStrategy = async (
  id: string,
  updatedData: Partial<IEstudiante>
) => {
  const studentRef = doc(db, "estudiantes", id);
  await updateDoc(studentRef, updatedData);
};
