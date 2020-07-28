// standalone page for affix permalinks
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/selectors';
import { 
	Link, 
	Redirect
} from 'react-router-dom';
import {
  Typography,
  Divider,
  Grid,
  Tooltip,
  SvgIcon,
	Fab,
	Paper,
	Container,
} from '@material-ui/core';
import {
	Edit as EditIcon,
} from '@material-ui/icons';
import SlotIcon from '../../Icons/SlotIcon';
import {
	Spacer,
	DeleteWithConfirmation
} from '../../Common';
import {
  titleCase
} from '../../utils';

class AffixPage extends Component {
  constructor(props) {
    super(props);
		this.state = {
			affix: {},
			redirect: null, // redirect location for redirects on affix deletion
		}
  }
	
	componentDidMount() {
		// fetch the affix from the db
		fetch(`/api/affix/${this.props.match.params.affixId}`)
			.then(res => res.json())
			.then(affix => this.setState({ affix }))
			.catch(err => console.log(err.response));
	}

  buildList(list) {
    if (list.length === 0) return "None";
    return list.map(e => titleCase(e)).join(', ')
  }

  render() {
    return (
			<Container>
				{
					this.state.redirect && (
						<Redirect to={this.state.redirect} />
					)
				}
	      <Paper style={{
					padding: 20,
					maxWidth: 1000,
				}}>
	        <Grid container direction="row">
	          <Grid item xs>
	            <Typography variant="h4">
	              {titleCase(this.state.affix.name || '')}
	            </Typography>
	          </Grid>
	          <Grid item justify="flex-end">
	            <SlotIcon slot={this.state.affix.slot || 'arms'}/>
	          </Grid>
	        </Grid>
	        <Divider />
	        <Spacer height={10} />
	        <div>
						<Typography>
							<b>Max Replicates: </b>
							{this.state.affix.maxReplicates === 0 ? 'Infinite' : this.state.affix.maxReplicates}
						</Typography>
	          <Typography>
	            <b>Cost: </b>
	            {this.state.affix.cost}
	          </Typography>
	          <Typography>
	            <b>Rarity: </b>
	            {titleCase(this.state.affix.affixType || '')}
	          </Typography>
	          <Typography>
	            <b>Tags: </b>
	            {this.buildList(this.state.affix.tags || [])}
	          </Typography >
						{
							this.state.affix.prerequisites && (
								<Typography>
					        <b>Prerequisites: </b>
					        {this.state.affix.prerequisites}
					      </Typography>
							)
						}
						<Typography gutterBottom>
							<b>Source: </b>
							{this.state.affix.source}
						</Typography>
	          <Typography paragraph>
	            {this.state.affix.descLong}
	          </Typography>
						{
							this.props.user.isAdmin && (
								<div style={{display: 'flex'}}>
									<Link to={`/affixes/edit/${this.state.affix._id}`} style={{marginLeft: 'auto', textDecoration: 'none'}}>
										<Tooltip title={`Edit ${titleCase(this.state.affix.name || '')}`}>
											<Fab color='primary' size='medium' aria-label='edit' variant='extended'>
												<EditIcon style={{marginRight: '10px'}}/>
												Edit
											</Fab>
										</Tooltip>
									</Link>
									<Spacer width={15} />
									<DeleteWithConfirmation 
										variantName={titleCase(this.state.affix.name || '')}
										apiURL={`/api/affix/${this.state.affix._id}`}
										callback={() => this.setState({redirect: '/affixes'})}
										variant='extended'
										buttonText='Delete'
									/>
								</div>
							)
						}
	        </div>
	      </Paper>
			</Container>
    );
  }
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(AffixPage);
