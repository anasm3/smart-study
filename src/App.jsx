import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Timer from "./components/Timer";
import Quote from "./components/Quote";
import Settings from "./components/Settings";
import History from "./components/History";
import Login from "./components/Login";
import TeacherDashboard from "./components/TeacherDashboard"; // Add Teacher Dashboard
import StudentDashboard from "./components/StudentDashboard"; // Add Student Dashboard

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(""); // Store role here

    useEffect(() => {
        // Check if a session is active
        const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const userRole = localStorage.getItem("currentRole");

        if (isUserLoggedIn && userRole) {
            setIsLoggedIn(true);
            setRole(userRole); // Set role after login
        }
    }, []);

    const handleLogin = (role) => {
        setIsLoggedIn(true);
        setRole(role); // Store the role on login
        localStorage.setItem("isLoggedIn", "true"); // Save login status
        localStorage.setItem("currentRole", role); // Save the role to localStorage
    };

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false"); // Reset login status
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRole");
        setIsLoggedIn(false);
        setRole(""); // Reset role
    };

    return (
        <Router>
            <div className="container">
                <h1>📚 Smart Study Companion</h1>
                <Routes>
                    <Route
                        path="/"
                        element={isLoggedIn ? (
                            <Navigate to={role === "teacher" ? "/teacher-dashboard" : "/student-dashboard"} />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )}
                    />
                    <Route
                        path="/teacher-dashboard"
                        element={isLoggedIn && role === "teacher" ? (
                            <TeacherDashboard onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" />
                        )}
                    />
                    <Route
                        path="/student-dashboard"
                        element={isLoggedIn && role === "student" ? (
                            <StudentDashboard onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/" />
                        )}
                    />
                </Routes>
            </div>
        </Router>
    );
}
