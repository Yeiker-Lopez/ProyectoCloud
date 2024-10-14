// src/Pages/EstudiantesPage.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [search, setSearch] = useState("");

  // Obtener estudiantes desde Firestore
  useEffect(() => {
    const fetchEstudiantes = async () => {
      const querySnapshot = await getDocs(collection(db, "estudiantes"));
      const estudiantesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Estudiante[];
      setEstudiantes(estudiantesData);
    };
    fetchEstudiantes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredStudents = estudiantes.filter(
    (estudiante) =>
      estudiante.nombre.toLowerCase().includes(search.toLowerCase()) ||
      estudiante.id.includes(search)
  );

  return (
    <div className="container">
      <h1>Lista de Estudiantes</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por ID o Nombre"
          onChange={handleSearch}
        />
      </div>
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
            {filteredStudents.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.id}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.carrera}</td>
                <td>{estudiante.telefono}</td>
                <td>{estudiante.fase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstudiantesPage;
