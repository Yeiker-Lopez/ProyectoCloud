import React from 'react';
import EstudianteList from '../components/Estudiante/EstudianteList';
import BuscarEstudiante from '../components/Estudiante/BuscarEstudiante';

const EstudiantesPage: React.FC = () => {
  return (
    <div>
      <BuscarEstudiante />
      <EstudianteList />
    </div>
  );
};

export default EstudiantesPage;
