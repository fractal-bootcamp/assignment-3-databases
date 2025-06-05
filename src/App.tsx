import './App.css'
import { Link, Outlet, useLocation } from 'react-router'

function App() {
  const location = useLocation()
  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
      </div>
      {location.pathname !== "/" && <Link className="link" to="/">{"<"} Home</Link>}
      <Outlet />
    </>
  )
}

export default App
