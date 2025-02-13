import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  

export default function Login({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [studentName, setStudentName] = useState(""); // New state for student name
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const currentRole = localStorage.getItem("currentRole");
        if (isLoggedIn) {
            if (currentRole === "teacher") {
                navigate("/teacher-dashboard");
            } else {
                navigate("/student-dashboard");
            }
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            if (localStorage.getItem(email)) {
                setErrorMessage("An account already exists with this email.");
                return;
            }

            const userData = { password, role };

            if (role === "student" && studentName.trim() === "") {
                setErrorMessage("Please enter your name.");
                return;
            }

            if (role === "student") {
                userData.studentName = studentName;
            }

            localStorage.setItem(email, JSON.stringify(userData));
            localStorage.setItem("isLoggedIn", "false");

            setIsSignUp(false);
            setEmail("");
            setPassword("");
            setStudentName("");
            setErrorMessage("Account created. Please log in.");
        } else {
            const userData = JSON.parse(localStorage.getItem(email));

            if (!userData || userData.password !== password) {
                setErrorMessage("Incorrect email or password.");
                return;
            }

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", email);
            localStorage.setItem("currentRole", userData.role);

            if (userData.role === "student" && userData.studentName) {
                localStorage.setItem("currentUserName", userData.studentName);
            }

            onLogin(userData.role);

            if (userData.role === "teacher") {
                navigate("/teacher-dashboard");
            } else {
                navigate("/student-dashboard");
            }
        }
    };

    return (
        <div className="card">
            <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isSignUp && (
                    <>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                        {role === "student" && (
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                required
                            />
                        )}
                    </>
                )}
                <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Log In" : "Sign Up"}
                </button>
            </p>
        </div>
    );
}
