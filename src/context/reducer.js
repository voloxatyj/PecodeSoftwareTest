import { VIEW_ITEM, STOP_VIEW_ITEM, SET_ITEMS, SET_FILTER, SET_REFRESH } from './types'

export const initialState =  {
	view: false,
	item: null,
	items: [],
	data: [],
	type: null
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case VIEW_ITEM:
			return {
				...state,
				view: true,
				item: action.payload
			}
		case STOP_VIEW_ITEM:
			return {
				...state,
				view: false,
			}
		case SET_ITEMS:
			return {
				...state,
				items: [...action.payload.items],
				data: [...action.payload.items],
				type: action.payload.type
			}
		case SET_FILTER:
			return {
				...state,
				items: action.payload
			}
		default:
			return state;
	}
}

export default reducer