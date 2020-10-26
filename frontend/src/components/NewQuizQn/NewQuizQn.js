import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Divider,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select
  } from '@material-ui/core';
import './NewQuizQn.css';
import { Button } from '../Button/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        width: '50ch',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));
  
  export default function NewQuiz(props) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState('');
    const [questions, setQuestion] = React.useState({});


    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <div className="newquizqn">
            <form className={classes.root} noValidate autoComplete="off">
                <p>Question {props.qnNum}</p>
                <TextField label="Enter Question" variant="outlined" name="qnTitle" onChange={props.click}/>

                <p>Option 1</p>
                <TextField label="Enter Option 1 Answer" variant="outlined" name="option1" onChange={props.click} />
                <p>Option 2</p>
                <TextField label="Enter Option 2 Answer" variant="outlined" name="option2" onChange={props.click}/>
                <p>Option 3</p>
                <TextField label="Enter Option 3 Answer" variant="outlined" name="option3" onChange={props.click}/>
                <p>Option 4</p>
                <TextField label="Enter Option 4 Answer" variant="outlined" name="option4" onChange={props.click}/>
                
                <p>Correct Answer</p>
                {/* <TextField label="Enter Correct Answer" variant="outlined" /> */}
            </form>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select value={selected} onChange={props.logMenuOpt}>
                    <MenuItem value="">
                        <em>Select Correct Answer</em>
                    </MenuItem>
                    <MenuItem value={'Option 1'}>Option 1</MenuItem>
                    <MenuItem value={'Option 2'}>Option 2</MenuItem>
                    <MenuItem value={'Option 3'}>Option 3</MenuItem>
                    <MenuItem value={'Option 4'}>Option 4</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={props.addToQnList}/>
            <Button onClick={props.logQn}/>
            <Divider variant="middle" />
        </div>
    )
}