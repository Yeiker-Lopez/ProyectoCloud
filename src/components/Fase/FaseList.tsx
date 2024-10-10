import { estudiantesData } from '../../Data/estudiantesData';

const FaseList = () => {
  return (
    <div>
      <h2>Lista de Estudiantes y sus Fases</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Teléfono</th>
            <th>Fase</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesData.map((est) => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre}</td>
              <td>{est.carrera}</td>
              <td>{est.telefono}</td>
              <td>{est.fase}</td>
              <td>{est.activo ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FaseList;
