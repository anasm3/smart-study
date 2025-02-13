import React, { useState } from "react";

export default function Quiz() {
    const questions = [
        { question: "What is React?", options: ["Library", "Framework"], correct: "Library" },
        { question: "JSX stands for?", options: ["JavaScript XML", "Java Syntax"], correct: "JavaScript XML" },
        { question: "React uses a ___ DOM?", options: ["Virtual", "Real"], correct: "Virtual" },
    ];

    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const checkAnswers = () => {
        let correctCount = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correct) correctCount++;
        });
        setScore(correctCount);
    };

    return (
        <div className="card">
            <h2>📚 Quiz</h2>
            {questions.map((q, i) => (
                <div key={i}>
                    <p>{q.question}</p>
                    {q.options.map((opt, j) => (
                        <button key={j} onClick={() => setAnswers({ ...answers, [i]: opt })}>
                            {opt}
                        </button>
                    ))}
                </div>
            ))}
            <button onClick={checkAnswers}>Check Answers</button>
            {score !== null && <p>Score: {score} / 3</p>}
        </div>
    );
}
