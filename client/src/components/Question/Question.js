import React from "react";

// components
import { Form, Button, Jumbotron } from "react-bootstrap";

import "./Question.css";

import { questionData } from "./QuestionData";

const Question = ({ stage, category }) => {

  const questions = questionData[stage].filter((obj) => {
    return obj.category === category;
  });
  const random = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[random];

  return (
    <div className="container-fluid">
      <Jumbotron>
        <div>{randomQuestion.question} </div>
        <br />
        <br />
        <div>
          <Form>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Enter your lie here:</Form.Label>
              <Form.Control placeholder="lie" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Jumbotron>
    </div>
  );
};

export default Question;
