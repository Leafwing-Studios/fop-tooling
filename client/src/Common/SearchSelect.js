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
	const [value, setValue] = React.useState(null);

  return (		
		<Autocomplete 
			id='combo-box'
			value={value}
			onChange={(event, newValue) => {
				if (typeof newValue === 'string') { // picking a value from the list (should all be strings)
					setValue(newValue);
				} else if (newValue && newValue.inputValue) { // adding a new value (this option is an object)
					setValue(newValue.inputValue);
				} else { // edge case for if something messes up
					setValue(newValue);
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);
				
				if (params.inputValue !== '') {
					filtered.push({
						inputValue: params.inputValue,
						title: `Add "${params.inputValue}"`
					})
				}
				
				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			options={props.options}
			getOptionLabel={(option) => {
				if (typeof option === 'string') { // all supplied options should be just strings that we can use directly
					return option;
				} 
				
				if (option.inputValue) { // the "Add X" option is an object, so we need to pull the actual value out of it
					return option.inputValue;
				}
			}}
			renderOption={(option) => { // as with getOptionLabel, we need to handle the "Add X" case, since it's not just a string
				if (typeof option === 'string') { 
					return option;
				} else { 
					return option.title;
				}
			}}
			freeSolo
			fullWidth
			renderInput={(params) => (
				<TextField
					{...params}
					label={props.label || "Search Box"}
				/>
			)}
		/>
  );
}
