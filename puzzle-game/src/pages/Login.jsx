import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Reusing the same styles from Register page
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
            } else {
                // Save token or user info if needed
                login(data.user, data.token);
                navigate("/game");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/register")} className="link">
                    Register
                </span>
            </p>
        </div>
    );
};

export default Login;
