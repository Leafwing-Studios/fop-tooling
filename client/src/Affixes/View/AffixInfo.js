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
	IconButton,
	Fab,
} from '@material-ui/core';
import {
	Edit as EditIcon,
	Link as LinkIcon,
	CallSplit as CopyIcon,
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
						this.props.user.isAdmin && (
							<>
								<Divider />
								<Spacer height={20} />
								<div style={{display: 'flex'}}>
									<Link to={`/affixes/edit/${this.props.affix._id}`} style={{marginLeft: 'auto', textDecoration: 'none'}}>
										<Tooltip title={`Edit ${titleCase(this.props.affix.name)}`}>
											<Fab color='primary' size='medium' aria-label='edit' variant='extended'>
												<EditIcon style={{marginRight: '10px'}} />
												Edit
											</Fab>
										</Tooltip>
									</Link>
									<Spacer width={15} />
									<Link to={`/affixes/copy/${this.props.affix._id}`} style={{textDecoration: 'none'}}>
										<Tooltip title={`Create a new affix, using ${titleCase(this.props.affix.name)} as a base`}>
											<Fab color='secondary' size='medium' aria-label='edit' variant='extended'>
												<CopyIcon style={{marginRight: '10px'}} />
												Copy
											</Fab>
										</Tooltip>
									</Link>
									<Spacer width={15} />
									<DeleteWithConfirmation 
										variantName={titleCase(this.props.affix.name)}
										apiURL={`/api/affix/${this.props.affix._id}`}
										callback={() => this.props.refresh()}
										variant='extended'
										buttonText='Delete'
									/>
								</div>
							</>
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
