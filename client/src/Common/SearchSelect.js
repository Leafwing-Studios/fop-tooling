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
	placeholder: placeholder text for the search box
	options: select list options
	multiple: selecting single or multiple?
*/

export default function SearchSelect(props) {
	const [value, setValue] = React.useState(props.multiple ? [] : null);

  return (
		<>
		<p>{JSON.stringify(value)}</p>
		<Autocomplete 
			id='combo-box'
			value={value}
			onChange={(event, newValue) => {
				let savedValue = newValue; // we need this to make the parent callback code clean
				
				if (typeof newValue === 'string') { // picking a value from the list (should all be strings)
					setValue(newValue);
				} else if (newValue && newValue.inputValue) { // adding a new value (this option is an object)
					setValue(newValue.inputValue);
					savedValue = newValue.inputValue; // saving something weird, so we need to propogate that down
				} else { // final case for the multiple option: always adds the objects since we need the whole thing
					setValue(newValue);
				}
				
				// send information up to the parent
				if (props.multiple) { // we need to do some data processing here to make sure the right values go out with custom options
					props.onChange(savedValue.map(val => {
						if (typeof val === 'string') return val;
						return val.inputValue;
					}))
				} else { // everything is just strings, so we can just send it up safely 
					props.onChange(savedValue)
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
			freeSolo
			multiple={props.multiple}
			fullWidth
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
			renderInput={(params) => (
				<TextField
					{...params}
					label={props.label || "Search Box"}
					placeholder={props.placeholder}
				/>
			)}
		/>
		</>
  );
}
