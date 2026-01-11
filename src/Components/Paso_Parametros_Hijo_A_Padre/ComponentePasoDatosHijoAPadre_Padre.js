import React, {useState} from 'react'
import ComponentePasoDatosHijoAPadre_Hijo from './ComponentePasoDatosHijoAPadre_Hijo';

export default function ComponentePasoDatosHijoAPadre_Padre() {

  const [datos, estableceDatos] = useState('');

  // Definimos la función que recibirá el mensaje del hijo
  const recibirMensaje = (mensaje) => {
       estableceDatos(mensaje); // Guardamos el mensaje en el estado
  }

  return (
    <div>
        {
            // <h3>Llamada a ComponentePasoDatosHijoAPadre_Padre</h3>
        }
        <fieldset className="miFieldset">
          <legend>ComponentePasoDatosHijoAPadre_Padre</legend>

          <p>Mensaje recibido: {datos}</p>
          <div>
              <ComponentePasoDatosHijoAPadre_Hijo enviarAlPadre={recibirMensaje} />
          </div>
        </fieldset>

    </div>
  )
}