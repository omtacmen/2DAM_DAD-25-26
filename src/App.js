import logo from './logo.svg';
import './App.css';
import AlumnosDashboard from './components/AlumnosDashboard';
import AlumnosEstadisticas from './components/AlumnosEstadisticas';

function App() {
  return (
    <div className="App">
      <AlumnosDashboard />
      <br></br>
      <hr></hr>
      <br></br>
      <hr></hr>
      <AlumnosEstadisticas />
    </div>
  );
}

export default App;
