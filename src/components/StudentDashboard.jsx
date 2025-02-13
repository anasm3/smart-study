import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Quote from "./Quote";
import Settings from "./Settings";
import History from "./History";
import "./StudentDashboard.css";

export default function StudentDashboard({ onLogout }) {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [studentReports, setStudentReports] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");

    useEffect(() => {
        const currentUserEmail = localStorage.getItem("currentUser");
        const currentUserName = localStorage.getItem("currentUserName");

        if (currentUserEmail) setStudentId(currentUserEmail);
        if (currentUserName) setStudentName(currentUserName);

        if (!currentUserEmail) return;

        const allQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        const studentReportsData = JSON.parse(localStorage.getItem(`studentReports_${currentUserEmail}`)) || [];

        setQuizzes(allQuizzes);
        setStudentReports(studentReportsData);
    }, []);

    const getAttemptCount = (quizId) => {
        return studentReports.filter(report => report.quizId === quizId).length;
    };

    const handleQuizSelection = (quiz) => {
        const attempts = getAttemptCount(quiz.quizId);

        if (attempts >= 3) {
            alert("❌ You have reached the maximum of 3 attempts for this quiz.");
            return;
        }

        setSelectedQuiz(quiz);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setQuizCompleted(false);
        setScore(0);
    };

    const handleAnswerSelection = (questionIndex, answerIndex) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, selectedQuiz.questions.length - 1));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSubmitQuiz = () => {
        if (Object.keys(selectedAnswers).length !== selectedQuiz.questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let calculatedScore = 0;
        selectedQuiz.questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) calculatedScore++;
        });

        setScore(calculatedScore);
        setQuizCompleted(true);

        const report = {
            quizId: selectedQuiz.quizId,
            quizName: `Quiz ${quizzes.findIndex(q => q.quizId === selectedQuiz.quizId) + 1}`,
            score: calculatedScore,
            totalQuestions: selectedQuiz.questions.length,
            date: new Date().toLocaleDateString(),
            studentName, // ✅ Save student name for teacher dashboard
        };

        let updatedReports = [...studentReports];

        // ✅ Check attempt count and prevent further storage if limit reached
        const attempts = getAttemptCount(selectedQuiz.quizId);
        if (attempts < 3) {
            updatedReports.push(report);
        }

        setStudentReports(updatedReports);
        localStorage.setItem(`studentReports_${studentId}`, JSON.stringify(updatedReports));

        // ✅ Update teacher's record of student attempts
        let allReports = JSON.parse(localStorage.getItem("allStudentReports")) || [];
        allReports = allReports.filter(r => !(r.studentName === studentName && r.quizId === selectedQuiz.quizId));
        allReports.push(report);
        localStorage.setItem("allStudentReports", JSON.stringify(allReports));
    };

    const handleClearHistory = () => {
        localStorage.removeItem(`studentReports_${studentId}`);
        setStudentReports([]);
        alert("Study history cleared!");
    };

    return (
        <div className="student-dashboard">
            <h2>👨‍🎓 Student Dashboard</h2>
            <p>Welcome, {studentName || "Student"}!</p>

            <div className="dashboard-content">
                <div className="left-panel">
                    <Timer />
                    <Quote />
                    <Settings />
                </div>

                <div className="right-panel">
                    <History reports={studentReports} onClearHistory={handleClearHistory} />
                    <div className="quiz-section">
                        <h3>Select a Quiz to Attempt</h3>
                        <div className="quiz-list">
                            {quizzes.length > 0 ? (
                                quizzes.map((quiz, index) => (
                                    <button
                                        key={quiz.quizId}
                                        className="quiz-button"
                                        onClick={() => handleQuizSelection(quiz)}
                                        disabled={getAttemptCount(quiz.quizId) >= 3} // ✅ Disable button after 3 attempts
                                    >
                                        Quiz {index + 1} {getAttemptCount(quiz.quizId) >= 3 ? "(Max attempts reached)" : ""}
                                    </button>
                                ))
                            ) : (
                                <p>No quizzes available.</p>
                            )}
                        </div>

                        {selectedQuiz && selectedQuiz.questions.length > 0 && !quizCompleted && (
                            <div className="quiz-attempt">
                                <h4>{selectedQuiz.questions[currentQuestionIndex].question}</h4>
                                <div className="answer-options">
                                    {selectedQuiz.questions[currentQuestionIndex].answers.map((answer, index) => (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name={`question-${currentQuestionIndex}`}
                                                value={index}
                                                checked={selectedAnswers[currentQuestionIndex] === index}
                                                onChange={() => handleAnswerSelection(currentQuestionIndex, index)}
                                            />
                                            {answer}
                                        </label>
                                    ))}
                                </div>

                                <div className="quiz-navigation">
                                    <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={currentQuestionIndex === selectedQuiz.questions.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>

                                {currentQuestionIndex === selectedQuiz.questions.length - 1 && (
                                    <button className="submit-button" onClick={handleSubmitQuiz}>
                                        Submit Quiz
                                    </button>
                                )}
                            </div>
                        )}

                        {quizCompleted && (
                            <div className="quiz-result">
                                <h3>Quiz Completed!</h3>
                                <p>Your Score: {score} / {selectedQuiz.questions.length}</p>
                            </div>
                        )}
                    </div>

                    <button className="logout-button" onClick={onLogout}>Log Out</button>
                </div>
            </div>
        </div>
    );
}
