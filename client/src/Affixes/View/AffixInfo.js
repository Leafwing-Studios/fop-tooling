import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../redux/selectors';
import { Link } from 'react-router-dom';
import {
  Typography,
  Divider,
  Grid,
  Tooltip,
  SvgIcon,
	Fab,
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

class AffixInfo extends Component {
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
        <Grid container direction="row">
          <Grid item xs>
            <Typography variant="h4">
              {titleCase(this.props.affix.name)}
            </Typography>
          </Grid>
          <Grid item justify="flex-end">
            <SlotIcon slot={this.props.affix.slot}/>
          </Grid>
        </Grid>
        <Divider />
        <Spacer height={10} />
        <div>
          <Typography>
            <b>Source: </b>
            {this.props.affix.source}
          </Typography>
          <Typography>
            <b>Cost: </b>
            {this.props.affix.cost}
          </Typography>
          <Typography>
            <b>Max Replicates: </b>
            {this.props.affix.maxReplicates === 0 ? 'Infinite' : this.props.affix.maxReplicates}
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
          </Typography >
          <Typography paragraph>
            {this.props.affix.descLong}
          </Typography>
					{
						this.props.user.isAdmin && (
							<div style={{display: 'flex'}}>
								<Link to={`/affixes/edit/${this.props.affix._id}`} style={{marginLeft: 'auto'}}>
									<Tooltip title='Edit this affix'>
										<Fab color='primary' size='medium' aria-label='edit'>
											<EditIcon />
										</Fab>
									</Tooltip>
								</Link>
								<Spacer width={15} />
								<DeleteWithConfirmation 
									variantName='affix'
									apiURL={`/api/affix/${this.props.affix._id}`}
								/>
							</div>
						)
					}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	user: getUser(state)
});

export default connect(
	mapStateToProps
)(AffixInfo);
