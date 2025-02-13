import React, { useState } from 'react';

const QuizCreator = () => {
    const [questions, setQuestions] = useState([
        { question: "", answers: ["", "", "", ""], correctAnswer: 0 },
    ]);

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answers[answerIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { question: "", answers: ["", "", "", ""], correctAnswer: 0 },
        ]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all questions and answers
        for (const q of questions) {
            if (!q.question || q.answers.some((answer) => answer.trim() === "")) {
                alert("Please fill in all fields.");
                return;
            }
            if (isNaN(q.correctAnswer) || q.correctAnswer < 0 || q.correctAnswer >= q.answers.length) {
                alert("Please select a valid correct answer.");
                return;
            }
        }

        // Generate a unique ID for the quiz
        const quizId = new Date().getTime(); // You can use a UUID or timestamp for unique ID
        
        // Save the quiz to localStorage
        const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
        quizzes.push({ quizId, questions });
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        // Log for debugging
        console.log('Quiz saved:', quizzes);

        alert("Quiz created successfully!");
        setQuestions([{ question: "", answers: ["", "", "", ""], correctAnswer: 0 }]);
    };

    return (
        <div>
            <h3>Create a Quiz</h3>
            <form onSubmit={handleSubmit}>
                {questions.map((q, questionIndex) => (
                    <div key={questionIndex}>
                        <label>
                            Question {questionIndex + 1}:
                            <input
                                type="text"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                                placeholder="Enter question"
                                required
                            />
                        </label>
                        <div>
                            <h4>Answers:</h4>
                            {q.answers.map((answer, answerIndex) => (
                                <div key={answerIndex}>
                                    <label>
                                        Answer {answerIndex + 1}:
                                        <input
                                            type="text"
                                            value={answer}
                                            onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                        <label>
                            Correct Answer:
                            <select
                                value={q.correctAnswer}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[questionIndex].correctAnswer = parseInt(e.target.value, 10);
                                    setQuestions(updatedQuestions);
                                }}
                                required
                            >
                                {q.answers.map((answer, index) => (
                                    <option key={index} value={index}>
                                        {answer}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="button" onClick={() => handleRemoveQuestion(questionIndex)}>
                            Remove Question
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default QuizCreator;
