import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const tileOrder = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],  // Initial
    [1, 0, 2, 3, 4, 5, 6, 7, 8],  // 1 slides left
    [1, 2, 0, 3, 4, 5, 6, 7, 8],  // 2 slides left
    [1, 2, 5, 3, 4, 0, 6, 7, 8],  // 5 slides up
    [1, 2, 5, 3, 0, 4, 6, 7, 8],  // 4 slides left
    [1, 2, 5, 0, 3, 4, 6, 7, 8],  // 3 slides left
    [0, 2, 5, 1, 3, 4, 6, 7, 8],  // and back...
];

const Home = () => {
    const [tiles, setTiles] = useState(tileOrder[0]);
    const [step, setStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);


    useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setStep((prev) => {
      const next = (prev + 1) % tileOrder.length;
      setTiles(tileOrder[next]);
      return next;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [isPaused]);

    return (
        <div className="home-container">
            <div
                className={`demo-puzzle-container ${isPaused ? "paused" : ""}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {tiles.map((tile, index) => {
                    const row = Math.floor(index / 3);
                    const col = index % 3;
                    return (
                        tile !== 8 && (
                            <div
                                key={tile}
                                className="demo-tile"
                                style={{
                                    top: `${row * 70}px`,
                                    left: `${col * 70}px`,
                                }}
                            >
                                {tile + 1}
                            </div>
                        )
                    );
                })}
            </div>
            <div className="demo-puzzle-container">
                
            </div>

            <h1 className="home-title">Welcome to 8 Puzzle Game 🧩</h1>
            <p className="home-subtitle">Slide. Solve. Compete.</p>
            <div className="home-buttons">
                <Link to="/login" className="home-btn">Login</Link>
                <Link to="/register" className="home-btn">Register</Link>
            </div>
        </div>
    );
};

export default Home;
