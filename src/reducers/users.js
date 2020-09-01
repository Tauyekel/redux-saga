import {GET_USERS_SUCCESS, USERS_ERROR} from '../actions/types'

const initialState = {
	items: [],
	error: ''
}

export default function users(state = initialState, { type, payload }) {

	switch (type) {
		case GET_USERS_SUCCESS:
			return {
				...state,
				items: payload
			};
		case USERS_ERROR:
			return {
				...state,
				error: payload
			};
		default:
			return state
	}
}
