import React, { Component } from 'react';
import {
	Snackbar,
	Button,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function GlobalAlert(props) {
	const [open, setOpen] = React.useState(false);
	
	const handleClose = (ev, reason) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	}
	
	return (
		<>
			<Button variant="outlined" onClick={() => setOpen(true)}>
				Open the snackbar!
			</Button>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					Affix saved successfully
				</Alert>
			</Snackbar>
		</>
	)
}
