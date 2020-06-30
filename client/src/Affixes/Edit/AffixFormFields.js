import React, { Component } from 'react';

import {
  Typography,
	Divider,
	TextField,
	Grid,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core';
import {
	Spacer,
} from '../../Common';

const spacerHeight = 25;

export default function AffixFormFields(props) { // just form fields, no state or control. validations are done at a higher level so that form submit buttons can disable themselves when there are errors
	
	return (
		<Grid container direction='row' spacing={5}>
			<Grid item sm={4}>
				<TextField
					id='name'
					label='Name'
					required
					fullWidth
					value={props.affix.name || '' /* hand it a default value here so it firstly loads as controlled. this avoids bugs */}
					onChange={(ev) => props.updateAffix({name: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='descShort'
					label='Short Description'
					required
					multiline
					fullWidth
					value={props.affix.descShort || ''}
					onChange={(ev) => props.updateAffix({descShort: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='descLong'
					label='Full Description'
					required
					multiline
					fullWidth
					value={props.affix.descLong || ''}
					onChange={(ev) => props.updateAffix({descLong: ev.target.value})}
				/>
			</Grid>
			<Grid item sm={3}>
				<FormControl style={{flexGrow: 1}} fullWidth>
					<InputLabel id='affix-editor-rarity-label'>Rarity</InputLabel>
					<Select
						id='rarity'
						required
						value={props.affix.affixType || 'common'}
						onChange={(ev) => props.updateAffix({affixType: ev.target.value})}
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
						value={props.affix.slot || 'arms'}
						onChange={(ev) => props.updateAffix({slot: ev.target.value})}
					>
						<MenuItem value='arms'>Arms</MenuItem>
						<MenuItem value='armor'>Armor</MenuItem>
						<MenuItem value='trinket'>Trinket</MenuItem>
						<MenuItem value='consumable'>Consumable</MenuItem>
					</Select>
				</FormControl>
				<Spacer height={spacerHeight} />
				<TextField
					id='prerequisites'
					label='Prerequisites'
					fullWidth
					value={props.affix.prerequisites || ''}
					onChange={(ev) => props.updateAffix({prerequisites: ev.target.value})}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='cost'
					label='Cost'
					required
					fullWidth
					value={props.affix.cost || ''}
					onChange={(ev) => props.updateAffix({cost: ev.target.value})}
					error={props.costError ? true : false /* this is here to avoid weird proptypes errors from autocasting */}
					helperText={props.costError}
				/>
				<Spacer height={spacerHeight} />
				<TextField
					id='maxReplicates'
					label='Max Replicates'
					required
					fullWidth
					value={props.affix.maxReplicates || ''}
					onChange={(ev) => props.updateAffix({maxReplicates: ev.target.value})}
					error={props.maxReplicatesError ? true : false}
					helperText={props.maxReplicatesError || 'Enter 0 for infinite max replicates'}
				/>
			</Grid>
		</Grid>
	);
}
