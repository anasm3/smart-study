import React, { useState } from "react";

export default function Settings() {
    const [studyTime, setStudyTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);

    return (
        <div className="card">
            <h2>⚙️ Session Settings</h2>
            <input type="number" value={studyTime} onChange={(e) => setStudyTime(Number(e.target.value))} placeholder="Study Time (min)" />
            <input type="number" value={breakTime} onChange={(e) => setBreakTime(Number(e.target.value))} placeholder="Break Time (min)" />
        </div>
    );
}