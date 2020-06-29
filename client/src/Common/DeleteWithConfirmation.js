import React from 'react'
import {
	Typography,
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Delete as DeleteIcon
} from '@material-ui/icons';
import {
	sleep
} from '../utils';

export default function DeleteWithConfirmation(props) { // displays a message for form submissions. can show either a success or error message
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	
	const send = async () => { // actually send the deletion api request
		setIsSubmitting(true);
		// console.log(props.apiURL);
		// await sleep(2000);
		// console.log('we done');
		// setIsSubmitting(false);
		
		fetch(props.apiURL, {method: 'DELETE'})
			.then(props.callback)
			.then(() => (setIsSubmitting(false)))
			.catch(err => console.log(err.response));
	}
	
	return (
		<Tooltip title={`Delete this ${props.variantName}`}>
			<Fab 
				size='medium' 
				aria-label='delete'
				onClick={(ev) => send()}
				disabled={isSubmitting || dialogOpen}
			>
				<DeleteIcon />
			</Fab>
		</Tooltip>
	)
}
