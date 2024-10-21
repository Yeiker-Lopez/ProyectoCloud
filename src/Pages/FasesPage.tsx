import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Importar Firebase
import { db } from "../firebaseConfig"; // Asegúrate de tener bien configurado Firebase
import "../Style/FasesPages.css"; // Estilos para la página

interface Estudiante {
  id: string;
  nombre: string;
  carrera: string;
  telefono: string;
  fase: "Diseño" | "Resultados";
}

const FasesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [students, setStudents] = useState<Estudiante[]>([]); // Estado para los estudiantes

  // Cargar los estudiantes desde Firebase
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "estudiantes"));
        const studentsData: Estudiante[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Estudiante[];
        setStudents(studentsData);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    };

    fetchStudents();
  }, []);

  // Manejar el cambio en el input de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar estudiantes por nombre, ID o fase
  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm) ||
      student.fase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Lista de Estudiantes y sus Fases</h1>

      {/* Input de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por ID, Nombre o Fase"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Mostrar mensaje si no se encuentran estudiantes */}
      {filteredStudents.length === 0 ? (
        <p className="no-results">No se encontró ningún estudiante.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Teléfono</th>
              <th>Fase</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.nombre}</td>
                <td>{student.carrera}</td>
                <td>{student.telefono}</td>
                <td>{student.fase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FasesPage;
