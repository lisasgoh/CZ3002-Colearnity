import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import './Filter.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Filter() {
    const classes = useStyles();
    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="filter">
            <i class="fas fa-filter fa-2x"></i>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Filter Post</InputLabel>
                <Select value={filter} onChange={handleChange}>
                    <MenuItem value="">
                        <em>All Courses</em>
                    </MenuItem>
                    <MenuItem value={'CZ3002 ASE'}>CZ3002 ASE</MenuItem>
                    <MenuItem value={'CZ3001 ACOA'}>CZ3001 ACOA</MenuItem>
                    <MenuItem value={'AZ1007 Data Structures'}>CZ1007 Data Structures</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
