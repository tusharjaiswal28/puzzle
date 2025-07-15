import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Optional: shared styles for Login/Register
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Registration failed");
            } else {
                alert("✅ Registration successful!");
                navigate("/login");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")} className="link">
                    Login
                </span>
            </p>
        </div>
    );
};

export default Register;
