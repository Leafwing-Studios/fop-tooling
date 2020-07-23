import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Typography,
	Button,
	Divider,
	CircularProgress,
} from '@material-ui/core';
import AffixFormFields from './AffixFormFields';
import {
	Spacer,
	SubmissionMessage,
} from '../../Common';
import {
	titleCase,
	sleep,
} from '../../utils';

export default class AffixEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			affix: {},
			isSubmitting: false, // are we currently submitting the form? 
			submissionSuccessful: null, // did the API give us a 200 response?
		}
		
		this.submitForm = this.submitForm.bind(this); // this incantation is required to access this in submitForm()
	}
	
	componentDidMount() {
		if (this.props.newAffix) {
			this.setState({ // set the default values for rarity and slot so they don't send null if unedited
				affix: {
					affixType: 'common',
					slot: 'arms',
					source: 'official:core', // set deafult source so it doesn't end up blank by accident. TODO: change this once other people can make affixes
				}
			})
		} else { // only fetch if we are editing
			// fetch the appropriate affix from the api. storing this in the redux store is not recommended for two reasons: 1. users can navigate to this page directly and 2. this component should be reusable for other editing or creation contexts
			fetch(`/api/affix/${this.props.match.params.affixId}`)
			.then(res => res.json())
			.then(affix => {
				const prettyAffix = {...affix, ...{
					name: titleCase(affix.name), // force title case to make it look nicer. we squash back down to lower case before saving in the submitForm function
					cost: '' + affix.cost, // cast number fields to strings so the autofill doesn't treat 0 like null
					maxReplicates: '' + affix.maxReplicates,
				}};
				this.setState({
					affix: prettyAffix,
				});
			})
			.catch(err => console.log(err.response));
		}
	}
	
	validateCost() { // computes the validations for the cost field. returns any error strings if any, otherwise returns null. this is nice because we can treat the value as either the error string, or as a boolean for whether to enable error mode on the field
		// must be a number
		if (this.state.affix.cost === '' || this.state.affix.cost === undefined) { // you're allowed to blank out fields because it gets caught by the required validation
			return null;
		}
		if (isNaN(this.state.affix.cost)) {
			return "Must be a number";
		}
		return null;
	}
	
	validateMaxReplicates() { // validations for the maxReplicates field
		// must be a number, must be >= 0
		if (this.state.affix.maxReplicates === '' || this.state.affix.maxReplicates === undefined) { 
			return null;
		}
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
			isSubmitting: true,
		})
		
		// make the name all lowercase before sending it off
		// parse the cost and max replicates into floats
		const cleanedAffix = {...this.state.affix, ...{
			name: this.state.affix.name.toLowerCase(),
			cost: parseFloat(this.state.affix.cost),
			maxReplicates: parseFloat(this.state.affix.maxReplicates),
			tags: this.state.affix.tags.map(tag => tag.toLowerCase()),
		}};
		
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				this.props.newAffix ? {affixes: cleanedAffix} : cleanedAffix // body format changes based on adding vs updating
			),
		}
		
		// api endpoint changes based on whether we're adding or updating
		const apiURL = this.props.newAffix ? '/api/affix' : `/api/affix/${this.props.match.params.affixId}`
		
		console.log(apiURL, cleanedAffix)
		
		fetch(apiURL, requestOptions)
			.then(res => {
				if (res.status === 200) {
					this.setState({
						isSubmitting: false,
						submissionSuccessful: true,
					})
				} else {
					this.setState({
						isSubmitting: false,
						submissionSuccessful: false,
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
				
				<AffixFormFields 
					affix={this.state.affix} 
					updateAffix={affix => this.updateAffix(affix)} 
					costError={this.validateCost()} 
					maxReplicatesError={this.validateMaxReplicates()}
				/>
				
				<Spacer height={20} />
				<Divider />
				<Spacer height={5} />
				
				<div style={{display: 'flex'}}>
					<Link to='/affixes' style={{textDecoration: 'none'}}>
						<Button variant='contained'>Back</Button>
					</Link>
					
					<div style={{display: 'flex', marginLeft: 'auto', alignItems: 'center'}}>
						<SubmissionMessage 
							show={this.state.submissionSuccessful !== null} 
							success={this.state.submissionSuccessful} 
						/>
						<Spacer width={15} />
						<Button 
							variant='contained' 
							color='primary' 
							type='submit' 
							style={{marginLeft: 'auto'}}
							disabled={this.validateCost() || this.validateMaxReplicates() || this.state.isSubmitting}
						>
							Submit
							{
								this.state.isSubmitting && ( /* loading spinner for submitting */
									<CircularProgress size={20} style={{marginLeft: '10px'}}/> 
								)
							}
						</Button>
					</div>
				</div>
			</form>
		);
	}
}
