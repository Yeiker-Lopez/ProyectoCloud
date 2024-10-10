import React, { useState } from 'react';
import { IEstudiante } from '../../interfaces/IEstudiantes';
import { estudiantesData } from '../../Data/estudiantesData';

const BuscarEstudiante: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<IEstudiante[]>([]);

  const handleSearch = () => {
    const filtered = estudiantesData.filter(estudiante =>
      estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estudiante.id.toString() === searchTerm
    );
    setResults(filtered);
  };

  return (
    <div>
      <h2>Buscar Estudiante</h2>
      <input
        type="text"
        placeholder="Buscar por ID o Nombre"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      <div>
        {results.map(estudiante => (
          <div key={estudiante.id}>
            <h3>{estudiante.nombre}</h3>
            <p>ID: {estudiante.id}</p>
            <p>Carrera: {estudiante.carrera}</p>
            <p>Teléfono: {estudiante.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuscarEstudiante;
