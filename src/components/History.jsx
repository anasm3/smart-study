import React from "react";

export default function History({ reports, onClearHistory }) {
    return (
        <div className="card">
            <h2>📜 Study History</h2>
            <button onClick={onClearHistory} className="clear-history-button">
                Clear Study History
            </button>
            <ul style={{ textAlign: "left" }}>
                {reports.length > 0 ? (
                    reports.map((entry, index) => (
                        <li key={index}>
                            <strong>Quiz:</strong> <em>{entry.quizName}</em> <br />
                            <strong>Score:</strong> {entry.score} / {entry.totalQuestions} <br />
                            <strong>Attempted On:</strong> {entry.date} <br />
                            <hr />
                        </li>
                    ))
                ) : (
                    <p>No history recorded yet.</p>
                )}
            </ul>
        </div>
    );
}
