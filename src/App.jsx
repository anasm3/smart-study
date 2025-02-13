import React from "react";
import Timer from "./components/Timer";
import Quote from "./components/Quote";
import Quiz from "./components/Quiz";
import Progress from "./components/Progress";

export default function App() {
    return (
        <div className="container">
            <h1>📚 Smart Study App</h1>
            <Quote />
            <Timer />
            <Quiz />
            <Progress />
        </div>
    );
}
