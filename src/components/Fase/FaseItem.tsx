import React from 'react';
import { IFase } from '../../interfaces/IFase';

interface Props {
  fase: IFase;
}

const FaseItem: React.FC<Props> = ({ fase }) => {
  return (
    <div>
      <p>Horas: {fase.horas}</p>
      <p>Créditos: {fase.creditos}</p>
      <p>Fase: {fase.fase}</p>
    </div>
  );
};

export default FaseItem;
