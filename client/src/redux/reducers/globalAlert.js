import {
	SET_GLOBAL_ALERT,
} from '../actionTypes';

const initialState = {
	severity: 'success',
	message: '',
}

export default function (state=initialState, action) {
	switch (action.type) {
		case SET_GLOBAL_ALERT:
			const { message } = action.payload;
			return message;
		default:
			return state;
	}
}
