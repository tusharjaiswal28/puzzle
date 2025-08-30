import React, { useEffect, useState } from "react";
import "./Game.css"; // optional: or use style.css globally
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const Game = () => {
    const [tiles, setTiles] = useState([...Array(9).keys()]);
    const [emptyIndex, setEmptyIndex] = useState(8);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [moveCount, setMoveCount] = useState(0);
    const [gameWon, setGameWon] = useState(false);


    const { logout, user, token } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        return () => clearInterval(timerId); // cleanup
    }, [timerId]);

    const canMove = (index) => {
        const emptyRow = Math.floor(emptyIndex / 3);
        const emptyCol = emptyIndex % 3;
        const row = Math.floor(index / 3);
        const col = index % 3;
        return (
            (emptyRow === row && Math.abs(emptyCol - col) === 1) ||
            (emptyCol === col && Math.abs(emptyRow - row) === 1)
        );
    };

    const handleTileClick = async (index) => {
        if (canMove(index)) {
            const newTiles = [...tiles];
            [newTiles[emptyIndex], newTiles[index]] = [
                newTiles[index],
                newTiles[emptyIndex],
            ];
            setTiles(newTiles);
            setEmptyIndex(index);
            setMoveCount((prev) => prev + 1);

            if (isSolved(newTiles)) {
                clearInterval(timerId);
                setGameWon(true);

                try {
                    await axios.post(
                        `${API_URL}/api/scores`,
                        { time: elapsedTime },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("Score submitted!");
                } catch (err) {
                    console.error("Failed to submit score:", err);
                }
            }
        }
    };

    const shuffleTiles = () => {
        let shuffled;
        do {
            shuffled = [...tiles];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        } while (isSolved(shuffled));
        setTiles(shuffled);
        setEmptyIndex(shuffled.indexOf(8));
        setMoveCount(0);
        startTimer();
    };

    const resetTiles = () => {
        const initial = [...Array(9).keys()];
        setTiles(initial);
        setEmptyIndex(8);
        setMoveCount(0)
        resetTimer();
    };

    const isSolved = (tilesArray) => {
        return tilesArray.every((tile, index) => tile === index);
    };

    const startTimer = () => {
        clearInterval(timerId);
        const start = Date.now();
        setStartTime(start);

        const id = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - start) / 1000));
        }, 1000);

        setTimerId(id);
    };

    const resetTimer = () => {
        clearInterval(timerId);
        setElapsedTime(0);
        setStartTime(null);
    };

    return (
        <div id="game-container">
            {/* Header with logout and welcome */}
            {/* <div className="game-header">
                <h1>8 Puzzle Game</h1>
                <div className="user-controls">
                    <span>Welcome, {user?.name || "Player"}!</span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div> */}

            {/* Timer */}
            <div id="timer">Time: {elapsedTime}s</div>

            <div id="move-counter">Moves: {moveCount}</div>

            {/* Puzzle Tiles */}
            <div id="puzzle-container">
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`tile ${tile === 8 ? "empty" : ""}`}
                        onClick={() => tile !== 8 && handleTileClick(index)}
                    >
                        {tile !== 8 ? tile + 1 : ""}
                    </div>
                ))}
            </div>


            {/* Buttons */}
            <div id="buttons">
                <button id="shuffle-button" onClick={shuffleTiles}>
                    Shuffle
                </button>
                <button id="reset-button" onClick={resetTiles}>
                    Reset
                </button>
            </div>

            {gameWon && (
                <div className="win-screen">
                    <div className="win-box">
                        <h2>🎉 You Win!</h2>
                        <p>Time: {elapsedTime}s</p>
                        <p>Moves: {moveCount}</p>
                        <button onClick={resetTiles}>Play Again</button>
                        <button onClick={() => navigate("/scoreboard")}>View Scoreboard</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
