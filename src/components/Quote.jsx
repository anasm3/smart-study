import React, { useState, useEffect } from "react";

export default function Quote() {
    const [quote, setQuote] = useState("");  // State to store a single quote
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    // Function to fetch a new quote
    const fetchQuote = async () => {
        const url = 'https://famous-quotes4.p.rapidapi.com/random?category=all&count=2';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'a97e299394mshfa2072f72fe542ep187c86jsna92335fc3c57',
                'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com'
            }
        };

        try {
            // Fetch data from the API
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();  // Parse the response as JSON
            console.log(result);  // Log the result to check the structure

            if (result && Array.isArray(result) && result.length > 0) {
                setQuote(result[0].text);  // Set only the first quote
            } else {
                setError("No quotes found in the response");
            }
        } catch (err) {
            console.error("Error fetching quotes:", err);
            setError(`Failed to fetch quote: ${err.message}`);
        } finally {
            setLoading(false);  // Set loading to false when the request is finished
        }
    };

    // Fetch the first quote when the component mounts
    useEffect(() => {
        fetchQuote();  // Fetch the first quote on initial load

        // Set up an interval to fetch a new quote every 10 seconds
        const interval = setInterval(fetchQuote, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);  // Empty dependency array, so this runs only once after initial render

    if (loading) {
        return <div className="card"><h2>Loading...</h2></div>;
    }

    if (error) {
        return <div className="card"><h2>{error}</h2></div>;
    }

    return (
        <div className="card">
            <h2>💡 Motivational Quote</h2>
            <p style={{ fontStyle: 'italic', color: '#555' }}>
                "{quote}"  {/* Display only one quote */}
            </p>
        </div>
    );
}
