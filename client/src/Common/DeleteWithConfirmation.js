import React from 'react'
import {
	Typography,
	Fab,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
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
		<>
			<Tooltip title={`Delete this ${props.variantName}`}>
				<Fab 
					size='medium' 
					aria-label='delete'
					onClick={(ev) => (setDialogOpen(true))}
					disabled={isSubmitting || dialogOpen}
				>
					<DeleteIcon />
				</Fab>
			</Tooltip>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
			>
				<DialogTitle id='alert-dialog-title'>
					{`Are you sure you want to delete this ${props.variantName}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action cannot be undone.
					</DialogContentText>
					<DialogActions>
	          <Button onClick={() => setDialogOpen(false)} color="primary">
	            Back
	          </Button>
	          <Button 
							onClick={() => {
								setDialogOpen(false);
								send();
							}} 
							color="primary" 
							autoFocus
						>
	            Confirm
	          </Button>
	        </DialogActions>
				</DialogContent>
			</Dialog>
		</>
	)
}
