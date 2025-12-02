// Paso de parametros por url
// Ejemplo
// localhost:3000/search=?paramName=acer&categoria=ordenador

import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchPage() {

    const [searchParams] = useSearchParams()
    const paramName = searchParams.get('paramName')
    const categoria = searchParams.get('categoria')
  return (
    <div>
        <h1>SearchPage</h1>
        <p>
            Detalles del producto en search: {paramName}, categoria: {categoria}
        </p>
    </div>
  )
}

export default SearchPage