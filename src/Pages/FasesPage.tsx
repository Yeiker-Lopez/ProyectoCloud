import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { IEstudiante } from "../interfaces/IEstudiantes";

const FasesPage: React.FC = () => {
  const [faseSeleccionada, setFaseSeleccionada] = useState<string>("Diseño");
  const [estudiantes, setEstudiantes] = useState<IEstudiante[]>([]);

  // Función para consultar estudiantes según la fase
  const consultarEstudiantes = async () => {
    try {
      const estudiantesRef = collection(db, "estudiantes"); 
      const q = query(estudiantesRef, where("fase", "==", faseSeleccionada)); 
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as IEstudiante[];
      setEstudiantes(data);
    } catch (error) {
      console.error("Error al consultar estudiantes:", error);
    }
  };

  // Actualizar estudiantes al cambiar la fase
  useEffect(() => {
    consultarEstudiantes();
  }, [faseSeleccionada]);

  return (
    <div className="container">
      <h1>Consultar Estudiantes por Fase</h1>
      {/* Botones para seleccionar fases */}
      <div className="buttons">
        <button
          className={faseSeleccionada === "Diseño" ? "active" : ""}
          onClick={() => setFaseSeleccionada("Diseño")}
        >
          Diseño
        </button>
        <button
          className={faseSeleccionada === "Resultados" ? "active" : ""}
          onClick={() => setFaseSeleccionada("Resultados")}
        >
          Resultados
        </button>
      </div>

      {/* Tabla para mostrar estudiantes */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.length > 0 ? (
            estudiantes.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.id}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.carrera}</td>
                <td>{estudiante.telefono}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay estudiantes en la fase {faseSeleccionada}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FasesPage;
