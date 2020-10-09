import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import "./QuizQns.css";

export default function QuizQns(props) {
  // state = {
  //     userAns: null,
  //     curQns: 0,
  //     options: []
  // }

  const [value, setValue] = React.useState("Option 1");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="question">
      <div className="qnsheader">
        <h6>Question no. {props.qnNum}</h6>
        <h6>{props.qnWeightage} marks</h6>
      </div>

      <p>Which is not a divisor of 36?</p>

      <div className="options">
        <FormControl component="fieldset" disabled={props.disabled}>
          <RadioGroup value={props.value} onChange={handleChange}>
            <FormControlLabel
              value="option 1"
              control={<Radio />}
              label="Option 1"
            />
            <FormControlLabel
              value="option 2"
              control={<Radio />}
              label="Option 2"
            />
            <FormControlLabel
              value="Option 3"
              control={<Radio />}
              label="Option 3"
            />
            <FormControlLabel
              value="Option 4"
              control={<Radio />}
              label="Option 4"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
