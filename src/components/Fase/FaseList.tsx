import React from "react";

interface FaseListProps {
  students: Array<{
    id: number;
    nombre: string;
    carrera: string;
    telefono: string;
    fase: string;
  }>;
}

const FaseList: React.FC<FaseListProps> = ({ students }) => {
  return (
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
        {students.map((student) => (
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
  );
};

export default FaseList;
