import React, { useState } from "react";
import "../Pages/FasesPages.css"; // Asegúrate de que este archivo CSS exista y esté vinculado correctamente

const FasesPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [students] = useState([
    { id: 1, nombre: "Juan Pérez", carrera: "Ingeniería en sistemas", telefono: "0999999999", fase: "Diseño" },
    { id: 2, nombre: "María González", carrera: "Ingeniería en sistemas", telefono: "0998888888", fase: "Resultados" },
    { id: 3, nombre: 'Carlos Ramírez', carrera: 'Ingeniería en Software', telefono: '0997777777', fase: 'Diseño', activo: true },
    { id: 4, nombre: 'Ana Jiménez', carrera: 'Ingeniería en Software', telefono: '0996666666', fase: 'Resultados', activo: false },
    { id: 5, nombre: 'Luis Martínez', carrera: 'Ingeniería en Sistemas', telefono: '0995555555', fase: 'Diseño', activo: true },
    { id: 6, nombre: 'Sofía Torres', carrera: 'Ingeniería en Software', telefono: '0994444444', fase: 'Resultados', activo: true },
    { id: 7, nombre: 'Andrés Ortiz', carrera: 'Ingeniería en Sistemas', telefono: '0993333333', fase: 'Diseño', activo: false },
    { id: 8, nombre: 'Paula Vargas', carrera: 'Ingeniería en Software', telefono: '0992222222', fase: 'Resultados', activo: true },
    { id: 9, nombre: 'Miguel Ríos', carrera: 'Ingeniería en Sistemas', telefono: '0991111111', fase: 'Diseño', activo: true },
    { id: 10, nombre: 'Laura Silva', carrera: 'Ingeniería en Software', telefono: '0990000000', fase: 'Resultados', activo: false },
    // Añade más estudiantes aquí
  ]);

  // Función para manejar el cambio en el input de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar los estudiantes en base al nombre o ID que el usuario introduce
  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
  );

  return (
    <div className="container">
      <h1>Lista de Estudiantes y sus Fases</h1>

      {/* Input de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por ID o Nombre"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Mostrar mensaje si no hay estudiantes encontrados */}
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
