import {
	SET_AFFIX_FILTERS,
	CLEAR_AFFIX_FILTERS,
} from '../actionTypes';

const initialState = {
	nameDesc: "",
	slot: "",
	cost: "", // this is stored a string because you start with a '-' when typing in negative numbers
	type: [],
	tags: [],
}

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_AFFIX_FILTERS:
			const { affixFilters } = action.payload;
			return affixFilters;
		case CLEAR_AFFIX_FILTERS:
			return initialState;
		default:
			return state;
	}
}
