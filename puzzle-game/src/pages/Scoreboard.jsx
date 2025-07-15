import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Scoreboard.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Scoreboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await axios.get(`${API_URL}/scores`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setScores(res.data);
            } catch (err) {
                console.error("Failed to fetch scores:", err);
            }
            finally {
                setLoading(false)
            }
        };

        fetchScores();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="scoreboard-container">
            {/* <div className="scoreboard-header">
                <h1>Scoreboard</h1>
                <div className="user-controls">
                    <span>Welcome, {user?.name || "Player"}!</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div> */}

            {loading ? (
                <p>Loading scores...</p>
            ) : (
                <table className="score-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Time (s)</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.length === 0 ? (
                            <tr>
                                <td colSpan="4">No scores yet.</td>
                            </tr>
                        ) : (
                            scores
                                .sort((a, b) => a.time - b.time)
                                .map((score, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{score.user?.name || "Unknown"}</td>
                                        <td>{score.time}s</td>
                                        <td>{score.user._id}</td>
                                    </tr>
                                ))
                        )}

                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Scoreboard;
