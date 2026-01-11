import { useState, createContext } from 'react'
import './App.css';

import ComponentePasoDatosHermano1 from './Components/Paso_Parametros_Hermano_A_Hermano/ComponentePasoDatosHermano1';
import ComponentePasoDatosHermano2 from './Components/Paso_Parametros_Hermano_A_Hermano/ComponentePasoDatosHermano2';

import ComponentePasoDatosPadreAHijo_Padre from './Components/Paso_Parametros_Padre_A_Hijo/ComponentePasoDatosPadreAHijo_Padre';
import ComponentePasoDatosPadreAHijo_Hijo from './Components/Paso_Parametros_Padre_A_Hijo/ComponentePasoDatosPadreAHijo_Hijo';

import ComponentePasoDatosHijoAPadre_Padre from './Components/Paso_Parametros_Hijo_A_Padre/ComponentePasoDatosHijoAPadre_Padre';
import ComponentePasoDatosHijoAPadre_Hijo from './Components/Paso_Parametros_Hijo_A_Padre/ComponentePasoDatosHijoAPadre_Hijo';


// Creamos el contexto para compartir datos entre hermanos
export const MensajeContexto = createContext();

function App() {

  const [count, setCount] = useState(0)

  const [mensaje, setMensaje] = useState('Mensaje inicial')


  return (
    <div>
      <h1><center>Paso de parámetros entre componentes</center></h1>
      <hr></hr>

      <div className="divStylePadreAhijo">
        <h2><center>__Paso de parametros entre Padre a Hijo__</center></h2>
        <ComponentePasoDatosPadreAHijo_Padre/>
      </div>

      <hr></hr>

      <div className="divStyleHijoApadre">
        <h2><center>__Paso de parametros entre Hijo a Padre__</center></h2>
        <ComponentePasoDatosHijoAPadre_Padre/>
      </div>
      
      <hr></hr>

      <div className="divStyleHermanos">
        <MensajeContexto.Provider value={{mensaje, setMensaje}}>

          <h2><center>__Paso de parámetros entre Componentes hermanos__</center></h2>
          <ComponentePasoDatosHermano1/>
          <ComponentePasoDatosHermano2/>

        </MensajeContexto.Provider>
      </div>

      <hr></hr>
      
    </div>
  );
}

export default App;
