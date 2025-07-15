import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Game from "./components/Game"
import Scoreboard from "./pages/Scoreboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}


function App() {
  const [count, setCount] = useState(0)
  const { user } = useAuth();

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
          {/* <Route path='/game' element={<Game/>}/> */}
          <Route path="/scoreboard" element={<ProtectedRoute><Scoreboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
