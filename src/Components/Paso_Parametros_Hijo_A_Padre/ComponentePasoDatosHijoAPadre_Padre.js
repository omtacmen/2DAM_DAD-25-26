import React, {useState} from 'react'
import ComponentePasoDatosHijoAPadre_Hijo from './ComponentePasoDatosHijoAPadre_Hijo';

export default function ComponentePasoDatosHijoAPadre_Padre() {

  // Definimos el estado para almacenar los datos recibidos del hijo
  // Inicialmente estará vacío
  // Cuando el hijo envíe un mensaje, actualizaremos este estado
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
              {
                // Llamamos al componente hijo y le pasamos la función recibirMensaje como prop
                // De esta forma el hijo podrá llamar a esta función para enviar datos al padre
                // Al hacer click en el botón del hijo, se ejecutará recibirMensaje en el padre
                // pasando el mensaje como argumento.
                // Esto permite la comunicación del hijo al padre mediante una función callback.
              }
              <ComponentePasoDatosHijoAPadre_Hijo enviarAlPadre={recibirMensaje} />
          </div>
        </fieldset>

    </div>
  )
}