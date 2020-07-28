import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
	Delete as DeleteIcon,
} from '@material-ui/icons';
import {
	sleep
} from '../utils';

const useStyles = makeStyles((theme) => ({
	fabDelete: {
		'&:hover': {
			backgroundColor: '#e83f3f',
			color: '#f0f0f0',
		}
	},
	confirmButton: {
		color: '#e83f3f'
	},
	icon: {
		marginRight: theme.spacing(1),
	}
}));

export default function DeleteWithConfirmation(props) { // displays a message for form submissions. can show either a success or error message
	const classes = useStyles();
	
	const [dialogOpen, setDialogOpen] = React.useState(false); // is the dialog box open?
	const [isSubmitting, setIsSubmitting] = React.useState(false); // are we currently waiting on the api? 
	
	const send = async () => { // actually send the deletion api request
		setIsSubmitting(true);
		
		fetch(props.apiURL, {method: 'DELETE'})
			.then((res) => {
				setIsSubmitting(false);
				return res;
			})
			.then(props.callback) // generic callback that the parent can provide. for redirects, success messages, page reloads, etc.
			.catch(err => console.log(err.response));
	}
	
	return (
		<>
			<Tooltip title={`Delete ${props.variantName}`}>
				<Fab 
					size={props.size || 'medium'}
					variant={props.variant}
					aria-label='delete'
					onClick={(ev) => (setDialogOpen(true))}
					disabled={isSubmitting || dialogOpen}
					className={classes.fabDelete}
				>
					<DeleteIcon className={props.buttonText ? classes.icon : undefined}/>
					{props.buttonText}
				</Fab>
			</Tooltip>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
			>
				<DialogTitle id='alert-dialog-title'>
					{`Are you sure you want to delete ${props.variantName}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action cannot be undone.
					</DialogContentText>
					<DialogActions>
	          <Button onClick={() => setDialogOpen(false)} >
	            Back
	          </Button>
	          <Button 
							onClick={() => {
								setDialogOpen(false);
								send();
							}} 
							className={classes.confirmButton}
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
