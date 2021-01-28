import React from "react";

// components
import { Table } from "react-bootstrap";

import "./Score.css";

const Score = () => {
  const scoreData = [
    {
      number: 1,
      name: "Mark",
      score: 500,
    },
    {
      number: 2,
      name: "Hemin",
      score: 200,
    },
    {
      number: 3,
      name: "Johnson",
      score: 1000,
    },
  ];

  return (
    <div className="container-fluid">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Score Board</th>
          </tr>
        </thead>
        <tbody>
          {scoreData.map((score) => (
            <tr>
              <td>{score.number}</td>
              <td>{score.name}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Score;
