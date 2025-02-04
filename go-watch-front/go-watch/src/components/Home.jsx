import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div className="text-center">
        <h2>Find your movies!</h2>
        <hr />

        <Link to="/movies">
          <h1>Buscar Filmes</h1>
        </Link>
      </div>
    </>
  )
}
