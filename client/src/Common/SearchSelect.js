import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  FormHelperText,
	TextField,
	Menu,
	MenuItem,
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

/* Important config props:
	label: label
	options: select list options
	freeSolo: allow entry of custom text, not just list options
	selectOnFocus: selects the entered text when clicked on
*/

export default function SearchSelect(props) {

  return (
		<Autocomplete 
			id='combo-box'
			options={props.options}
			freeSolo={props.freeSolo}
			selectOnFocus={props.selectOnFocus === null ? true : props.selectOnFocus}
			fullWidth
			clearOnBlur
			renderInput={(params) => (
				<TextField
					{...params}
					label={props.label || "Search Box"}
				/>
			)}
		/>
  );
}
