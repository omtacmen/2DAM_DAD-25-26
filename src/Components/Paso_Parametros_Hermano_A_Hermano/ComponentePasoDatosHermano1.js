import React, { useContext } from 'react'
import { MensajeContexto } from '../../App'

export default function ComponentePasoDatosHermano1() {
  const { setMensaje } = useContext(MensajeContexto);
  return (
    <div>
      <fieldset className="miFieldset">
        <legend>ComponentePasoDatosHermano1</legend>

        <p>Contenido del componente</p>
        
        <button onClick={() => setMensaje("Nuevo mensaje desde Hermano1")}> Enviar mensaje a Hermano 2 </button>
      </fieldset>
    </div>
  )
}