import logo from './logo.svg';
import './App.css';
import { PrimerComponente } from './Components/PrimerComponente';
import { SegundoComponente } from './Components/SegundoComponente';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola mundo
        </p>
        <PrimerComponente/>
        <SegundoComponente/>
      </header>
    </div>
  );
}

export default App;
