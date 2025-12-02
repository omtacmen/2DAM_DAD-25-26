// rafc
import React, {useState} from 'react'
import './PrimerComponente.css';

export const PrimerComponente = () => {

 //  let nombre = "Oliver";
  let web = "ieslomodelaherradura.org";

  let frutas = [
    "manzanas",
    "peras",
    "melones",
    "plantanos",
    "naranjas"
  ]

  // Un estado es una variable que está sujeta a cambios, ¿que quiero una variable se refresque por pantalla
  // en tiempo real?, pues para eso necesito utilizar los estados (useState).
  const [nombre, setNombre] = useState("Oliver");

  const cambiarNombre = (nuevoNombre) => {
    setNombre(nuevoNombre);
  }

  const funcionOnChange = (event) => {
    setNombre(event.target.value);
  }

  return (
    <div>
        <h1>Este es mi Primer Componente</h1>
        <p>Este es mi primer texto del primer componente</p>
        <p>Mi nombre es: <strong className={nombre.length < 4 ? 'rojo' : 'verde'}> {nombre} </strong> </p>
        <p>Mi web es: {web} </p>

        <input type="text" onChange={funcionOnChange} ></input>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <br></br>
        <br></br>

        <button onClick={ e => cambiarNombre("PEPITO")}>Cambiar nombre</button>

        <ul>
          <li key="1">Lunes</li>
          <li key="2">Martes</li>
          <li key="3">Miercoles</li>
          <li key="4">Jueves</li>
          <li key="5">Viernes</li>
          <li key="6">Sabado</li>
        </ul>


        <ul>
            {
                frutas.map((fruta, indice) => {
                    return (<li key={indice}>{fruta}</li>)
                })
            }
        </ul>

        <hr></hr>

    </div>
  )
}
