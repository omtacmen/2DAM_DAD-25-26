import React, { useContext } from 'react'
import { MensajeContexto } from '../../App'

export default function ComponentePasoDatosHermano2() {
  const { mensaje } = useContext(MensajeContexto);

  return (
    <div>
      <fieldset className="miFieldset">
        <legend>ComponentePasoDatosHermano2</legend>

        <p>Mensaje: {mensaje}</p>
      </fieldset>
    </div>
  )
}