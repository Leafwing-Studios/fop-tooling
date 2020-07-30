// standalone page for affix permalinks
import React, { Component } from 'react';
import { 
	Link, 
	Redirect
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  Typography,
  Divider,
  Grid,
  Tooltip,
  SvgIcon,
	Fab,
	Paper,
	Container,
	CircularProgress,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	FileCopy as CopyIcon,
} from '@material-ui/icons';

import SlotIcon from '../../Icons/SlotIcon';
import {
	Spacer,
	DeleteWithConfirmation,
	Center,
} from '../../Common';
import AffixActions from '../AffixActions';
import {
  titleCase
} from '../../utils';

const paperStyle={
	padding: 20,
	maxWidth: 1000,
};

export default class AffixPage extends Component {
  constructor(props) {
    super(props);
		this.state = {
			affix: {},
			redirect: null, // redirect location for redirects on affix deletion
			isLoading: true, // are we loading the affix?
		}
  }
	
	componentDidMount() {
		// fetch the affix from the db
		fetch(`/api/affix/${this.props.match.params.affixId}`)
			.then(res => res.json())
			.then(affix => {
				this.setState({ 
					affix,
					isLoading: false,
				});
				// document.title = `${titleCase(affix.name)} - ${document.title}`;
			})
			.catch(err => console.log(err.response));
	}

  buildList(list) {
    if (list.length === 0) return "None";
    return list.map(e => titleCase(e)).join(', ')
  }

  render() {
		if (this.state.isLoading) {
			return (
				<Container>
					<Paper style={paperStyle}>
						<div style={{display: 'flex'}}>
							<CircularProgress size={100} style={{margin: 'auto'}}/>
						</div>
					</Paper>
				</Container>
			)
		}
    return (
			<Container>
				{
					this.state.redirect && (
						<Redirect to={this.state.redirect} />
					)
				}
				<Helmet>
					<title>{`${titleCase(this.state.affix.name)} - Fonts of Power Tooling`}</title>
					<meta name="description" content={this.state.affix.descLong} />
					<meta property="og:title" content={`${titleCase(this.state.affix.name)} - Fonts of Power Tooling`} />
					<meta property="og:description" content={this.state.affix.descLong} />
				</Helmet>
	      <Paper style={paperStyle}>
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
							this.state.affix.stacking && (
								<Typography paragraph>
									<b>With additional stacks: </b>
									{this.state.affix.stacking}
								</Typography>
							)
						}
						<AffixActions 
							deleteCallback={() => this.setState({redirect: '/affixes'})}
							affix={this.state.affix}
						/>
	        </div>
	      </Paper>
			</Container>
    );
  }
}
