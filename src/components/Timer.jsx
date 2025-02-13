import React, { useState, useEffect } from "react";

export default function Timer() {
    const [studyTime, setStudyTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [timeLeft, setTimeLeft] = useState(studyTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isStudySession, setIsStudySession] = useState(true);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            const audio = new Audio('/audio/bell.mp3');
            audio.play();
            if (isStudySession) {
                setIsStudySession(false);
                setTimeLeft(breakTime);
            } else {
                setIsStudySession(true);
                setTimeLeft(studyTime);
            }
        }
    }, [isRunning, timeLeft, studyTime, breakTime, isStudySession]);

    return (
        <div className="card">
            <h2>⏳ Study Timer</h2>
            <p>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pause" : "Start"}</button>
            <button onClick={() => { setTimeLeft(studyTime); setIsRunning(false); }}>Reset</button>
        </div>
    );
}
