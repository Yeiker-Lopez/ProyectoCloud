import React from 'react';
import { IEstudiante } from '../../interfaces/IEstudiantes';
import { estudiantesData } from '../../Data/estudiantesData';
import EstudianteItem from './EstudianteItem';

const EstudianteList: React.FC = () => {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      {estudiantesData.map((estudiante: IEstudiante) => (
        <EstudianteItem key={estudiante.id} estudiante={estudiante} />
      ))}
    </div>
  );
};

export default EstudianteList;
