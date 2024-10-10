import React from 'react';
import { IFase } from '../../interfaces/IFase';
import FaseItem from './FaseItem';

const fasesData: IFase[] = [
  { horas: 144, creditos: 144, fase: 'Diseño' },
  { horas: 144, creditos: 144, fase: 'Resultados' },
];

const FaseList: React.FC = () => {
  return (
    <div>
      <h2>Fases de Estudiantes</h2>
      {fasesData.map((fase: IFase, index: number) => (
        <FaseItem key={index} fase={fase} />
      ))}
    </div>
  );
};

export default FaseList;
