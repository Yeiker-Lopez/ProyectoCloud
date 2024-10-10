import React from 'react';
import { IEstudiante } from '../../interfaces/IEstudiantes';

interface Props {
  estudiante: IEstudiante;
}

const EstudianteItem: React.FC<Props> = ({ estudiante }) => {
  return (
    <div>
      <h3>{estudiante.nombre}</h3>
      <p>Carrera: {estudiante.carrera}</p>
      <p>Teléfono: {estudiante.telefono}</p>
    </div>
  );
};

export default EstudianteItem;
