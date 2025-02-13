import React, { useState, useEffect } from "react";
import QuizCreator from "./QuizCreator";

export default function TeacherDashboard({ onLogout }) {
    const [studentReports, setStudentReports] = useState([]);

    useEffect(() => {
        const reports = JSON.parse(localStorage.getItem("allStudentReports")) || [];
        setStudentReports(reports); // ✅ Now only stores the latest results
    }, []);

    return (
        <div className="card">
            <h2>👩‍🏫 Teacher Dashboard</h2>
            <QuizCreator />

            <h3>📊 Student Quiz Attempts</h3>
            {studentReports.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Quiz Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentReports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.studentName}</td>
                                <td>{report.quizName}</td>
                                <td>{report.score} / {report.totalQuestions}</td>
                                <td>{report.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No quiz attempts yet.</p>
            )}

            <button onClick={onLogout}>Log Out</button>
        </div>
    );
}
