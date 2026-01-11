import React from 'react'

export default function ComponentePasoDatosHijoAPadre_Hijo({ enviarAlPadre }) {

  const manejarClick = () => {
    enviarAlPadre("Mensaje enviado desde el componente Hijo");
  }
  return (
    <div>
        {
            // <h3>Llamada a ComponentePasoDatosHijoAPadre_Hijo</h3>
        }
        <fieldset className="miFieldset">
          <legend>ComponentePasoDatosHijoAPadre_Hijo</legend>

          <button onClick={manejarClick}>Enviar mensaje al Padre</button>
        </fieldset>
        
    </div>
  )
}