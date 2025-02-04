import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Movie</h1>
        </div>
        <div className="col text-end">
          <a href="#!">
            <span className="badge bg-success">Login</span>
          </a>
        </div>
        <hr className="mb-3" />
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/movies"
                className="list-group-item list-group-item-action"
              >
                Movie
              </Link>
              <Link
                to="/genres"
                className="list-group-item list-group-item-action"
              >
                Genre
              </Link>
              <Link
                to="/admin/movie/0"
                className="list-group-item list-group-item-action"
              >
                Add Movie
              </Link>
              <Link
                to="/admin"
                className="list-group-item list-group-item-action"
              >
                Manage catalogue
              </Link>
              <Link
                to="/graphql"
                className="list-group-item list-group-item-action"
              >
                GraphQL
              </Link>
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
