import { BorderAllRounded } from "@material-ui/icons";
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";

export default function ProfileCard(props) {
  let { scoredMarks, totalMarks, quizTitle, quizAttempt } = props;

  return (
    <Card
      style={{ minWidth: "12rem", marginBottom: "2em", borderRadius: "15px" }}
    >
      <Card.Body>
        <Card.Title>{quizTitle}</Card.Title>
        <Card.Text
          style={{
            display: "flex",
            alignSelf: "flex-end",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {scoredMarks} / {totalMarks}
        </Card.Text>
        <Button onClick={quizAttempt}>Review Quiz Attempt</Button>
      </Card.Body>
    </Card>
  );
}
