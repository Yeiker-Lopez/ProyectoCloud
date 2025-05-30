import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import "../Style/EstudiantesPage.css"; 


interface Estudiante {
  id: string;
  nombre: string;
  carrera: string;
  telefono: string;
  fase: string;
}

const EstudiantesPage: React.FC = () => {
  const [students, setStudents] = useState<Estudiante[]>([]);
  const [newStudent, setNewStudent] = useState<Partial<Estudiante>>({});
  const [editingStudent, setEditingStudent] = useState<Estudiante | null>(null); 
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "estudiantes"));
        const studentData: Estudiante[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Estudiante[];
        setStudents(studentData);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    };
    fetchStudents();
  }, []);
  

  // Validación de campos vacíos
  const areFieldsFilled = () => {
    return (
      newStudent.nombre &&
      newStudent.carrera &&
      newStudent.telefono &&
      newStudent.fase
    );
  };


  const handleAddStudent = async () => {
    if (!areFieldsFilled()) {
      setErrorMessage("Todos los campos son obligatorios.");
      return; 
    }

    try {
      const docRef = await addDoc(collection(db, "estudiantes"), newStudent);
      setStudents([...students, { id: docRef.id, ...newStudent } as Estudiante]);
      setNewStudent({});
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "estudiantes", id));
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  // editar un estudiante
  const handleEditStudent = (student: Estudiante) => {
    setEditingStudent(student);
    setNewStudent(student);
  };

  // Actualizar un estudiante
  const handleUpdateStudent = async () => {
    if (!areFieldsFilled()) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (editingStudent) {
      try {
        const studentRef = doc(db, "estudiantes", editingStudent.id);
        await updateDoc(studentRef, newStudent);
        setStudents(
          students.map((student) =>
            student.id === editingStudent.id ? { ...student, ...newStudent } as Estudiante : student
          )
        );
        setEditingStudent(null);
        setNewStudent({});
        setErrorMessage("");
      } catch (error) {
        console.error("Error al actualizar estudiante:", error);
      }
    }
  };

  return (
    <div className="page-container">
      <h1>Gestión de Estudiantes</h1>

      {/* Mostrar mensaje de error si los campos están vacíos */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-container">
        <input
          type="text"
          placeholder="Nombre"
          value={newStudent.nombre ?? ""}
          onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Carrera"
          value={newStudent.carrera ?? ""}
          onChange={(e) => setNewStudent({ ...newStudent, carrera: e.target.value })}
        />
        <input
          type="text"
          placeholder="celular"
          value={newStudent.telefono ?? ""}
          onChange={(e) => setNewStudent({ ...newStudent, telefono: e.target.value })}
        />
        <input
          type="text"
          placeholder="Fase"
          value={newStudent.fase ?? ""}
          onChange={(e) => setNewStudent({ ...newStudent, fase: e.target.value })}
        />
        {editingStudent ? (
          <button onClick={handleUpdateStudent}>Actualizar Estudiante</button>
        ) : (
          <button onClick={handleAddStudent}>Agregar Estudiante</button>
        )}
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Teléfono</th>
            <th>Fase</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.nombre}</td>
              <td>{student.carrera}</td>
              <td>{student.telefono}</td>
              <td>{student.fase}</td>
              <td>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  className="delete-button"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditStudent(student)}
                  className="edit-button"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudiantesPage;
