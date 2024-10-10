import { useState } from 'react'; 
import { estudiantesData, Estudiante } from '../../Data/estudiantesData';

const BuscarEstudiante = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Estudiante | null>(null);

  const buscarEstudiante = () => {
    const estudianteEncontrado = estudiantesData.find(
      (est) =>
        est.nombre.toLowerCase() === query.toLowerCase() || 
        est.id === Number(query)
    );
    setResult(estudianteEncontrado || null);
  };

  return (
    <div>
      <h2>Buscar Estudiante</h2>
      <input
        type="text"
        placeholder="Buscar por ID o nombre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={buscarEstudiante}>Buscar</button>

      {result ? (
        <div>
          <h3>Estudiante Encontrado:</h3>
          <p><strong>ID:</strong> {result.id}</p>
          <p><strong>Nombre:</strong> {result.nombre}</p>
          <p><strong>Carrera:</strong> {result.carrera}</p>
          <p><strong>Teléfono:</strong> {result.telefono}</p>
          <p><strong>Fase:</strong> {result.fase}</p>
          <p><strong>Estado:</strong> {result.activo ? 'Activo' : 'Inactivo'}</p>
        </div>
      ) : (
        <p>No se encontró ningún estudiante.</p>
      )}
    </div>
  );
};

export default BuscarEstudiante;
