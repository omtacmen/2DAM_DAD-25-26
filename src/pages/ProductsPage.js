import React from 'react'
import { Link, useParams } from 'react-router-dom'

function ProductsPage() {
    // Aqui preparamos para recoger parametros. Es un hook preparado para recoger parametros
  const params = useParams()

  return (
    <div>
        <h1>Detalles del producto: { params.paramName }, categoria: {params.category}</h1>
        <p>{ params.paramName }</p>

        {/* No me recarga toda la página, sino me recarga solo el componente */}
        <Link to="/blog"> Ir a blog </Link>

        {/* Me recarga toda la página, por lo que se recomienda solamente utilizar el Link de antes */}
        <a href="/blog">Ir a blog desde a</a>

    </div>
  )
}

export default ProductsPage