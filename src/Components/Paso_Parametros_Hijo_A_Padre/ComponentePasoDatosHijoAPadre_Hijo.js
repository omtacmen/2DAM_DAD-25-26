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
        
        <button onClick={manejarClick}>Enviar mensaje al Padre</button>
    </div>
  )
}