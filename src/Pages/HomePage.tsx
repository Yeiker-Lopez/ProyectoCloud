import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToEstudiantes = () => {
    navigate('/estudiantes');
  };

  const goToFases = () => {
    navigate('/fases');
  };

  return (
    <div className="homepage">
      <h1>Bienvenido al Sistema Educativo</h1>
      <div className="buttons">
        <button onClick={goToEstudiantes} className="button">
          Ver Estudiantes
        </button>
        <button onClick={goToFases} className="button">
          Ver Fases
        </button>
      </div>
    </div>
  );
};

export default HomePage;
