import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGlobalAlert } from '../redux/selectors';

import {
	Snackbar,
	Button,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function GlobalAlert(props) {
	const [open, setOpen] = React.useState(false);
	const [alert, setAlert] = React.useState({
		severity: 'success',
		message: ''
	})
	
	React.useEffect(() => {
		if (props.reduxAlert.message) {
			setAlert(props.reduxAlert);
			setOpen(true);
		}
	}, [props.reduxAlert])
	
	const handleClose = (ev, reason) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	}
	
	return (
		<>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={alert.severity}>
					{alert.message}
				</Alert>
			</Snackbar>
		</>
	)
}

const mapStateToProps = state => ({
	reduxAlert: getGlobalAlert(state)
});

export default connect(
	mapStateToProps
)(GlobalAlert);
