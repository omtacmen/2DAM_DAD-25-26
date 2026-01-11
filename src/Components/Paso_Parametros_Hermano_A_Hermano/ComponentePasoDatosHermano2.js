import React, { useContext } from 'react'
import { MensajeContexto } from '../../App'

export default function ComponentePasoDatosHermano2() {
  const { mensaje } = useContext(MensajeContexto);

  return (
    <div>
        <h3>ComponentePasoDatosHermano2</h3>
        <p>Mensaje: {mensaje}</p>
    </div>
  )
}