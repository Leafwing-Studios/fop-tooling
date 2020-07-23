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
	onChange: callback when the autocomplete changes. spits out the event and the new value
	defaultValue: starting value for the picker
*/

export default function SearchSelect(props) {
	const startValue = props.defaultValue == null ? (props.multiple ? [] : null) : props.defaultValue; // uses the provided default value. if none is provided, use an empty array for the multiple selector, and null for the single selector
	
	const [value, setValue] = React.useState(startValue);
	React.useEffect(() => setValue(props.defaultValue || startValue), [props.defaultValue]); // this is done so the default value can be grabbed asynchronously, like when fetching an affix from the db on page load

  return (
		<>
		{true && JSON.stringify(value) /* debug */}
			<Autocomplete 
				id='combo-box'
				value={value}
				onChange={(event, newValue) => {
					// grab the value that was just added. for single, that's just the value. for multiple, it's pushed to the end of the array
					let valueToSave = newValue;
					if (props.multiple) {
						valueToSave = newValue[newValue.length - 1];
					}
					
					if (valueToSave && valueToSave.slice(0, 5) === 'Add "') { // if this is a new custom value, strip off the 'Add ""' text
						valueToSave = valueToSave.slice(5, -1);
					}
					
					if (props.multiple) { // multiple select has to save arrays, not values
						if (newValue.length < value.length) { // if we are deleting a value
							setValue(newValue);
							props.onChange(event, newValue);
						} else { // adding a new value appends it to the original array now that it's been cleaned
							const fullArray = value;
							fullArray.push(valueToSave);
							
							setValue(fullArray);
							props.onChange(event, fullArray);
						}
					} else { // single select case can just save out the string
						setValue(valueToSave);
						props.onChange(event, valueToSave);
					}
				}}
				filterOptions={(options, params) => {
					const filtered = filter(options, params);
					
					if (params.inputValue !== '') {
						filtered.push(`Add "${params.inputValue}"`)
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
