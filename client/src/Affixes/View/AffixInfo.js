import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Divider,
  Grid,
  Tooltip,
  SvgIcon,
	IconButton,
	Fab,
} from '@material-ui/core';
import {
	Link as LinkIcon,
} from '@material-ui/icons';
import SlotIcon from '../../Icons/SlotIcon';
import {
	Spacer,
	DeleteWithConfirmation
} from '../../Common';
import AffixActions from '../AffixActions';
import {
  titleCase
} from '../../utils';

export default class AffixInfo extends Component {
  constructor(props) {
      super(props);
  }

  buildList(list) {
    if (list.length === 0) return "None";
    return list.map(e => titleCase(e)).join(', ')
  }

  getPrerequisites() {
    if (this.props.affix.prerequisites) return (
      <Typography>
        <b>Prerequisites: </b>
        {this.props.affix.prerequisites}
      </Typography>
    );
  }

  render() {
    return (
      <div>
        <Grid container direction="row" alignItems='center'>
          <Grid item xs>
						<Grid container direction="row" alignItems='center' spacing={1}>
							<Grid item>
		            <Typography variant="h4">
		              {titleCase(this.props.affix.name)}
		            </Typography>
							</Grid>
							<Grid item>
								<Tooltip title='Permalink to this affix'>
									<Link to={`/affixes/${this.props.affix._id}`}>
										<IconButton size='small'>
											<LinkIcon color="action"/>
										</IconButton>
									</Link>
								</Tooltip>
							</Grid>
						</Grid>
          </Grid>
          <Grid item>
            <SlotIcon slot={this.props.affix.slot} />
          </Grid>
        </Grid>
        <Divider />
        <Spacer height={10} />
        <div>
					<Typography>
						<b>Max Replicates: </b>
						{this.props.affix.maxReplicates === 0 ? 'Infinite' : this.props.affix.maxReplicates}
					</Typography>
          <Typography>
            <b>Cost: </b>
            {this.props.affix.cost}
          </Typography>
          <Typography>
            <b>Rarity: </b>
            {titleCase(this.props.affix.affixType)}
          </Typography>
          {
            this.getPrerequisites()
          }
          <Typography gutterBottom>
            <b>Tags: </b>
            {this.buildList(this.props.affix.tags)}
          </Typography>
          <Typography paragraph>
            {this.props.affix.descLong}
          </Typography>
					{
						this.props.affix.stacking && (
							<Typography paragraph>
								<b> With additional stacks: </b>
								{this.props.affix.stacking}
							</Typography>
						)
					}
					<AffixActions 
						deleteCallback={() => this.props.refresh()}
						affix={this.props.affix}
					/>
        </div>
      </div>
    );
  }
}
