import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({ // don't ask me why you have to nest it like this. i don't have answers.
    checked: Array(props.labels.length).fill(false) // array of booleans to store which boxes are ticked
  });

  const updateCheckbox = (index, value) => {
    const tmp = state.checked;
    tmp[index] = value;
    setState({...state, checked: tmp});
  };

  const numChecked = state.checked.reduce((count, val) => val ? count+1 : count, 0); // counts the number of checkboxes that are ticked
  const full = numChecked === props.numSelections;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{props.title}</FormLabel>
        <FormGroup>
          {props.labels.map((label, index) => (
            <FormControlLabel
              control={<Checkbox
                checked={state.checked[index]}
                onChange={(ev) => updateCheckbox(index, ev.target.checked)}
                disabled={full && !state.checked[index]}
              />}
              label={label}
              key={index}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
