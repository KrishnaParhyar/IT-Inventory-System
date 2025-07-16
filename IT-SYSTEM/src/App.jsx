import './App.css'
import Login from './components/Login'
import Signup from './components/SignUp'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { useState, useEffect } from 'react'
import Employees from './components/Employees';
import Designations from './components/Designations';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated (has valid token)
    const token = localStorage.getItem('token')
    if (token) {
      // You can add token validation logic here
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Public Route Component (redirects to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

// Layout Component for authenticated pages
const AuthenticatedLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can add a header/navbar here */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

// Layout Component for public pages
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        </Route>

        {/* Protected Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/designations" element={<Designations />} />
          {/* Add more protected routes here */}
          {/* <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} /> */}
          {/* <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} /> */}
          {/* <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} /> */}
        </Route>

        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
