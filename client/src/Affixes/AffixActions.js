import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/selectors';

import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
	Fab,
	Tooltip,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	FileCopy as CopyIcon,
} from '@material-ui/icons';

import {
	Spacer,
	DeleteWithConfirmation
} from '../Common';
import {
  titleCase
} from '../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	center: {
		display: 'flex',
		margin: 'auto',
	},
	link: {
		textDecoration: 'none',
	},
	icon: {
		marginRight: theme.spacing(1),
	},
	divider: {
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	}
}));

function AffixActions(props) {
	const classes = useStyles();

	if (props.user.isAdmin) {
	  return (
			<>
				<Divider className={classes.divider} />
				<div className={classes.root}>
					<div className={classes.center}>
						<Link to={`/affixes/edit/${props.affix._id}`} className={classes.link}>
							<Tooltip title={`Edit ${titleCase(props.affix.name)}`}>
								<Fab color='primary' size='medium' aria-label='edit' variant='extended'>
									<EditIcon className={classes.icon} />
									Edit
								</Fab>
							</Tooltip>
						</Link>
						<Spacer width={15} />
						<Link to={`/affixes/copy/${props.affix._id}`} className={classes.link}>
							<Tooltip title={`Create a new affix, using ${titleCase(props.affix.name)} as a base`}>
								<Fab color='secondary' size='medium' aria-label='edit' variant='extended'>
									<CopyIcon className={classes.icon} />
									Copy
								</Fab>
							</Tooltip>
						</Link>
						<Spacer width={15} />
						<DeleteWithConfirmation 
							variantName={titleCase(props.affix.name)}
							apiURL={`/api/affix/${props.affix._id}`}
							callback={props.deleteCallback}
							variant='extended'
							buttonText='Delete'
						/>
					</div>
				</div>
			</>
	  );
	} else {
		return (
			<>
			</>
		)
	}
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(AffixActions);
