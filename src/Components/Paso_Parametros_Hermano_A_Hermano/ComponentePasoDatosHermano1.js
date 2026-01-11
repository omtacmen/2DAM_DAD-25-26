import React, { useContext } from 'react'
import { MensajeContexto } from '../../App'

export default function ComponentePasoDatosHermano1() {
  const { setMensaje } = useContext(MensajeContexto);
  return (
    <div>
        <h3>ComponentePasoDatosHermano1</h3>
        <button onClick={() => setMensaje("Nuevo mensaje desde Hermano1")}> Enviar mensaje a Hermano 2 </button>

    </div>
  )
}