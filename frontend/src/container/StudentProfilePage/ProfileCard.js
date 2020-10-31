import { BorderAllRounded } from "@material-ui/icons";
import React from "react";
import Card from "react-bootstrap/Card";

export default function ProfileCard(props) {
  let { scoredMarks, totalMarks, quizTitle } = props;

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
      </Card.Body>
    </Card>
  );
}
