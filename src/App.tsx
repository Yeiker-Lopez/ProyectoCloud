import React from 'react';
import EstudianteList from './components/Estudiante/EstudianteList';
import FaseList from './components/Fase/FaseList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Sistema Educativo - Comisión de Titulación</h1>
      <EstudianteList />
      <FaseList />
    </div>
  );
};

export default App;
