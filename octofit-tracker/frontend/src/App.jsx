import { Link, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './utils/api'

function App() {
  return (
    <div className="container py-5">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav flex-wrap gap-2">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
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
                <p className="text-muted">
                  Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use a Codespaces API URL, otherwise the app falls back to localhost.
                </p>
                <a href={getApiBaseUrl('/api/health')} className="btn btn-primary mt-3">
                  Check backend health
                </a>
              </div>
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
