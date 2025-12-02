// rfce
import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    const paramName = "hp"
    const categoria = "ordenadores"

  return (
    <div>
        <h1>HomePage</h1>

        <Link to={`/products/${paramName}/${categoria}`}> Ir a productos </Link>
        
        <a href="/blog">Ir a blog desde a</a>

    </div>
  )
}

export default HomePage