import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="container py-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="display-6">Welcome to OctoFit Tracker</h1>
                <p className="lead">
                  Track workouts, manage teams, and compare progress in one place.
                </p>
                <a href="http://localhost:8000/api/health" className="btn btn-primary mt-3">
                  Check backend health
                </a>
              </div>
            </div>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="card shadow-sm">
              <div className="card-body">
                <h2>Leaderboard</h2>
                <p className="text-muted">A modern multi-tier experience is now initialized.</p>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
