import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import EstudiantesPage from './Pages/EstudiantesPage';
import FasesPage from './Pages/FasesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/estudiantes" element={<EstudiantesPage />} />
        <Route path="/fases" element={<FasesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
