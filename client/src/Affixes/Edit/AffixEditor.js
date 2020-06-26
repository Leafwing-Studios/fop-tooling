import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Typography,
	Button,
	Divider,
	TextField,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
} from '@material-ui/core';
import {
	Spacer,
} from '../../Common';
import {
	titleCase,
	sleep,
} from '../../utils';

const spacerHeight = 25;

export default class AffixEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			affix: {},
			submissionStatus: null, // options: null, submitting, success, error
		}
		
		this.submitForm = this.submitForm.bind(this); // this incantation is required to access this in submitForm()
	}
	
	componentDidMount() {
		// fetch the appropriate affix from the api. storing this in the redux store is not recommended for two reasons: 1. users can navigate to this page directly and 2. this component should be reusable for other editing or creation contexts
		fetch(`/api/affix/${this.props.match.params.affixId}`)
			.then(res => res.json())
			.then(affix => {
				const prettyAffix = {...affix, ...{name: titleCase(affix.name)}}; // force title case to make it look nicer. we squash back down to lower case before saving in the submitForm function
				this.setState({
					affix: prettyAffix,
				});
			})
			.catch(err => console.log(err.response));
	}
	
	validateCost() { // computes the validations for the cost field. returns any error strings if any, otherwise returns null. this is nice because we can treat the value as either the error string, or as a boolean for whether to enable error mode on the field
		// must be a number
		if (isNaN(this.state.affix.cost)) {
			return "Must be a number";
		}
		return null;
	}
	
	validateMaxReplicates() { // validations for the maxReplicates field
		// must be a number, must be >= 0
		if (isNaN(this.state.affix.maxReplicates)) {
			return "Must be a number";
		}
		if (parseFloat(this.state.affix.maxReplicates) < 0) {
			return "Must be greater than or equal to zero";
		}
		return null;
	}
	
	updateAffix(newAffix) { // generic affix update callback for form fields
		const oldAffix=this.state.affix;
		const affix = {...oldAffix, ...newAffix};
		
		this.setState({affix});
	}
	
	async submitForm(ev) { // callback for form submission
		ev.preventDefault();
		
		this.setState({
			submissionStatus: 'submitting',
		})
		
		// make the name all lowercase before sending it off
		// parse the cost and max replicates into floats
		const cleanedAffix = {...this.state.affix, ...{
			name: this.state.affix.name.toLowerCase(),
			cost: parseFloat(this.state.affix.cost),
			maxReplicates: parseFloat(this.state.affix.maxReplicates),
		}};
		
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(cleanedAffix),
		}
		
		fetch(`/api/affix/${this.props.match.params.affixId}`, requestOptions)
			.then(res => {
				if (res.status === 200) {
					this.setState({
						submissionStatus: 'success'
					})
				} else {
					this.setState({
						submissionStatus: 'error'
					})
				}
			})
			.catch(err => console.log(err.response));
	}

	render() {
		return (
			<form onSubmit={this.submitForm} autoComplete='off'>
				{false && ( /* debug */
					<>
						<p>{JSON.stringify(this.state.affix)}</p>
						<Divider />
						<Spacer height={10} />
					</>
				)}
				<Grid container direction='row' spacing={5}>
					<Grid item sm={4}>
						<TextField
							id='name'
							label='Name'
							required
							fullWidth
							value={this.state.affix.name || '' /* hand it a default value here so it firstly loads as controlled. this avoids bugs */}
							onChange={(ev) => this.updateAffix({name: ev.target.value})}
						/>
						<Spacer height={spacerHeight} />
						<TextField
							id='descShort'
							label='Short Description'
							required
							multiline
							fullWidth
							value={this.state.affix.descShort || ''}
							onChange={(ev) => this.updateAffix({descShort: ev.target.value})}
						/>
						<Spacer height={spacerHeight} />
						<TextField
							id='descLong'
							label='Full Description'
							required
							multiline
							fullWidth
							value={this.state.affix.descLong || ''}
							onChange={(ev) => this.updateAffix({descLong: ev.target.value})}
						/>
					</Grid>
					<Grid item sm={3}>
						<FormControl style={{flexGrow: 1}} fullWidth>
							<InputLabel id='affix-editor-rarity-label'>Rarity</InputLabel>
							<Select
								id='rarity'
								required
								value={this.state.affix.affixType || 'common'}
								onChange={(ev) => this.updateAffix({affixType: ev.target.value})}
							>
								<MenuItem value='common'>Common</MenuItem>
								<MenuItem value='advanced'>Advanced</MenuItem>
								<MenuItem value='exotic'>Exotic</MenuItem>
								<MenuItem value='prismatic'>Prismatic</MenuItem>
							</Select>
						</FormControl>
						<Spacer height={spacerHeight} />
						<FormControl style={{flexGrow: 1}} fullWidth>
							<InputLabel id='affix-editor-rarity-label'>Slot</InputLabel>
							<Select
								id='slot'
								required
								value={this.state.affix.slot || 'arms'}
								onChange={(ev) => this.updateAffix({slot: ev.target.value})}
							>
								<MenuItem value='arms'>Arms</MenuItem>
								<MenuItem value='armor'>Armor</MenuItem>
								<MenuItem value='trinket'>Trinket</MenuItem>
								<MenuItem value='consumable'>Consumable</MenuItem>
							</Select>
						</FormControl>
						<Spacer height={spacerHeight} />
						<TextField
							id='cost'
							label='Cost'
							required
							fullWidth
							value={this.state.affix.cost || ''}
							onChange={(ev) => this.updateAffix({cost: ev.target.value})}
							error={this.validateCost() ? true : false /* this is here to avoid weird proptypes errors from autocasting */}
							helperText={this.validateCost()}
						/>
						<Spacer height={spacerHeight} />
						<TextField
							id='maxReplicates'
							label='Max Replicates'
							required
							fullWidth
							value={this.state.affix.maxReplicates || ''}
							onChange={(ev) => this.updateAffix({maxReplicates: ev.target.value})}
							error={this.validateMaxReplicates() ? true : false}
							helperText={this.validateMaxReplicates() || 'Enter 0 for infinite max replicates'}
						/>
					</Grid>
				</Grid>
				
				<Spacer height={20} />
				<Divider />
				<Spacer height={5} />
				<div style={{display: 'flex'}}>
					<Link to='/affixes' style={{textDecoration: 'none'}}>
						<Button variant='contained'>Back</Button>
					</Link>
					<div style={{display: 'flex', marginLeft: 'auto', alignItems: 'center'}}>
						{
							this.state.submissionStatus === 'success' && (
								<Typography style={{marginRight: 15}}>Affix saved successfully!</Typography>
							)
						}
						{
							this.state.submissionStatus === 'error' && (
								<Typography style={{marginRight: 15}}>An error occurred saving this affix. Please contact a site administrator.</Typography>
							)
						}
						<Button 
							variant='contained' 
							color='primary' 
							type='submit' 
							style={{marginLeft: 'auto'}}
							disabled={this.validateCost() || this.validateMaxReplicates() /* if either validation function has errors, turn off the submit button. the submit automatically fails if there are unfilled required fields */}
						>
							Submit
							{
								this.state.submissionStatus === 'submitting' && ( /* loading spinner for submitting */
									<CircularProgress size={20} color='#ffffff' style={{marginLeft: '10px'}}/> 
								)
							}
						</Button>
					</div>
				</div>
			</form>
		);
	}
}
