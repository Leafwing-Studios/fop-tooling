/*

	DEPRECATED AS OF 2020-07-23. DO NOT USE.
	USE SearchSelect.js INSTEAD

*/

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import {
  FormHelperText
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    flexGrow: 1,
    minWidth: 200,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, variants, theme) {
  return {
    fontWeight:
      variants.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [variants, setVariants] = React.useState([]);

  React.useEffect(() => {
    if(variants.length !== props.value.length) { // this length check is required since values are compared as lowercase, but displayed as uppercase. this event is only here so the parent can blank out the picker (filters reset button needs this)
      setVariants(props.value);
    }
  }, [props.value]);

  const handleChange = event => {
    setVariants(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="mutiple-chip-label">{props.label}</InputLabel>
      <Select
        labelId="mutiple-chip-label"
        id="mutiple-chip"
        multiple
        // style={{
        //   width: '600px'
        // }}
        autoWidth
        value={variants}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {props.items.map(name => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, variants, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
      {
        props.helperText &&
        <FormHelperText>{props.helperText}</FormHelperText>
      }
    </FormControl>
  );
}
