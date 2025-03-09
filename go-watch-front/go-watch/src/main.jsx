import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { Error } from './components/Error.jsx'
import Home from './components/Home.jsx'
import Movies from './components/Movies.jsx'
import Genres from './components/Genres.jsx'
import EditMovie from './components/EditMovie.jsx'
import ManageCatalogue from './components/ManageCatalogue.jsx'
import Graphql from './components/Graphql.jsx'
import Login from './components/Login.jsx'
import Movie from './components/Movie.jsx'
import {OneGenre} from "./components/OneGenre.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: '/movies', element: <Movies /> },
      { path: '/movies/:id', element: <Movie /> },
      { path: '/genres', element: <Genres /> },
      { path: '/genres/:id', element: <OneGenre /> },
      { path: '/admin/movie/0', element: <EditMovie /> },
      { path: '/admin/movie/:id', element: <EditMovie /> },
      { path: '/manage-catalogue', element: <ManageCatalogue /> },
      { path: '/graphql', element: <Graphql /> },
      { path: '/login', element: <Login /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
