import React from 'react'
import {
	Typography,
} from '@material-ui/core';

export default function SubmissionMessage(props) { // displays a message for form submissions. can show either a success or error message
	if (props.show) {
		if (props.success) {
			return (
				<Typography>Saved successfully!</Typography>
			)
		} else {
			return (
				<Typography>An error occurred while submitting this form. Please contact a site administrator</Typography>
			)
		}
	}
	
	// default case: return empty jsx tag
	return (
		<></>
	);
}
