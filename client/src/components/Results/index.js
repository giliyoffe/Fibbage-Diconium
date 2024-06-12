import React, { useState, useEffect } from 'react';
import Badge from "react-bootstrap/Badge";


const Results = () => {
    const chosenAnswersObject = [
        {
          isTheTruth: false,
          isWrittenByUser: true,
          answer: "trees",
          writer: "Nadica",
          choosers: ["Gili", "Tim", "Alki"],
        },
        {
          isTheTruth: false,
          isWrittenByUser: true,
          answer: "flowers",
          writer: "Nadica",
          choosers: ["Torsten", "Dennis"],
        },
        {
          isTheTruth: false,
          isWrittenByUser: false,
          answer: "flowers",
          writer: undefined,
          choosers: ["Torsten", "Dennis"],
        },
        {
          isTheTruth: true,
          isWrittenByUser: false,
          answer: "Rocks",
          writer: undefined,
          choosers: ["Torsten", "Dennis"],
        }
    ];

    const [seconds, setSeconds] = useState(0);
    // setSeconds(0);
    useEffect(() => {
        // const interval = setInterval(() => {
        setInterval(() => {
            if(seconds===chosenAnswersObject.length) setSeconds(seconds => seconds);
            setSeconds(seconds => seconds + 1);
            console.log(seconds);
        }, 5000);
    }, [seconds, chosenAnswersObject.length]);

    return (
        <div className="resultsContainer">
            <h1><Badge className="chosenAnswerOption" variant="primary">{chosenAnswersObject[seconds].answer}</Badge></h1>
            <div>
                { chosenAnswersObject[seconds].choosers.map((chooser, index) => (
                    <h2 key={index} className="answeredBy"><Badge className="chosenAnswerOption" variant="primary">{chooser}</Badge></h2>
                ))}
            </div>
        </div>
    )
}


export default Results;
