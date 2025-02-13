import React, { useState, useEffect } from "react";

export default function Progress() {
    const [studyHours, setStudyHours] = useState(0);

    useEffect(() => {
        const storedHours = JSON.parse(localStorage.getItem("studyHours")) || 0;
        setStudyHours(storedHours);
    }, []);

    return (
        <div className="card">
            <h2>📊 Progress</h2>
            <p>Study Hours: {studyHours} hrs</p>
        </div>
    );
}
