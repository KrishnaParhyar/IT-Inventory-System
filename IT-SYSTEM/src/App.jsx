import './App.css'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Signup from './components/SignUp'
import ForgetPassword from './components/ForgetPassword'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* <Sidebar /> */}
    </>
  )
}

export default App
