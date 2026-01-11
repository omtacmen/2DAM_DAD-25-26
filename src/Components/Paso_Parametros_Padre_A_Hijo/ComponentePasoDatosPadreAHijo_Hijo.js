import React from 'react'
// Definimos el componente pasándole como entrada los datos de un objeto en la variable padreAhijo
export default function ComponentePasoDatosPadreAHijo_Hijo({padreAhijo}) {

  return (
    <div>
        {
            // <h4>Llamada a ComponentePasoDatosPadreAHijo_Hijo</h4>
        }

        <fieldset className="miFieldset">
          <legend>ComponentePasoDatosPadreAHijo_Hijo</legend>

          <div>
            <p>Nombre: {padreAhijo.nombre}</p>
            <p>Apellidos: {padreAhijo.apellidos}</p>
            <p>Vidas: {padreAhijo.vidas}</p>
          </div>
        </fieldset>
    </div>
  )
}