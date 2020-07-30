import React from 'react';
import {
	Typography,
} from '@material-ui/core';

export default function DisplayParagraph(props) {
	const paragraphs = props.text.split('\n');
	
	return (
		<>
			{paragraphs.map(paragraph => (
				<Typography paragraph>
					{paragraph}
				</Typography>
			))}
		</>
	)
}
