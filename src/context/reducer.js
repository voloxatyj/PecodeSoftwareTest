import { VIEW_ITEM, STOP_VIEW_ITEM } from './types'

export const initialState =  {
	view: false,
	item: null
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
		default:
			return state;
	}
}

export default reducer