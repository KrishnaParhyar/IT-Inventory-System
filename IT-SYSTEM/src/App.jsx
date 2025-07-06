import './App.css'
import Login from './components/Login'
import Signup from './components/SignUp'
import ForgetPassword from './components/ForgetPassword'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>

      {/* <Sidebar /> */}
    </>
  )
}

export default App
