import BuscarEstudiante from '../components/Estudiante/BuscarEstudiante';
import FaseList from '../components/Fase/FaseList';
import './FasesPages.css';   // Importamos los estilos

const FasesPage = () => {
  return (
    <div>
      <h1>Página de Fases</h1>
      <BuscarEstudiante />
      <FaseList />
    </div>
  );
};

export default FasesPage;
