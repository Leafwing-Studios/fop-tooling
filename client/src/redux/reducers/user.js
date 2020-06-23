import {
	SET_USER,
	CLEAR_USER,
} from '../actionTypes';

const initialState = {
	id: null,
	email: '',
	isAdmin: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			const { user } = action.payload;
			return {
				id: user._id || 'no id',
				email: user.email || 'no email',
				isAdmin: user.isAdmin || 'no isAdmin',
			}
		case CLEAR_USER:
			return initialState;
		default:
			return state;
	}
}
