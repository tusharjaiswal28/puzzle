import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" ><Link to="/">🧩 8 Puzzle</Link></div>
      <ul className="navbar-links">
        <li><Link to="/game">Play</Link></li>
        <li><Link to="/scoreboard">Scoreboard</Link></li>
        {user ? (
          <>
            <li className="navbar-user">Hi, {user.name}</li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
