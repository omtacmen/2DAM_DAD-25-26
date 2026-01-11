import React, { useState } from 'react'
import ComponentePasoDatosPadreAHijo_Hijo from './ComponentePasoDatosPadreAHijo_Hijo';

export default function () {

  const [datos, estableceDatos] = useState('');

  // Objeto con datos nombre, apellidos y vidas.
  const datosAenviarALhijo = {
    nombre: 'Pepe',
    apellidos: 'apellido1 apellido2',
    vidas: 3
  }

  // Función padreAhijo que introduce en la variable de estado "datos" el objeto que se le pasa por parámetro de entrada.
  const padreAhijo = (data) => {
    estableceDatos(data);
  }

  return (
    <div>
        {
         // <h4>Llamada a ComponentePasoDatosPadreAHijo_Padre</h4>
         // Nos encontramos en el componente Padre y llamamos al componente Hijo
         // pasándole la función padreAhijo que devuelve los datos del objeto "datosAenviarALhijo"
        }
        <ComponentePasoDatosPadreAHijo_Hijo padreAhijo={datos}/>

        <div>
            <button onClick={() => padreAhijo(datosAenviarALhijo)}>Enviar mensaje a hijo</button>
        </div>

    </div>
  )
}