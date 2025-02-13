import React, { useState, useEffect } from "react";

export default function Timer({ onSessionEnd }) {
    const [timeLeft, setTimeLeft] = useState(1500); // Default: 25 minutes
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            onSessionEnd(1500); // Pass duration of the session (in seconds)
            setIsRunning(false);
        }
    }, [isRunning, timeLeft, onSessionEnd]);

    const handleReset = () => {
        setTimeLeft(1500); // Reset to 25 minutes
        setIsRunning(false);
    };

    return (
        <div className="card">
            <h2>⏳ Study Timer</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={handleReset} style={{ marginLeft: '10px' }}>
                Reset
            </button>
        </div>
    );
}
