import { VIEW_ITEM, STOP_VIEW_ITEM, SET_ITEMS, SET_FILTER, ADD_ITEM, DELETE_ITEM, SET_TYPE } from './types'

export const initialState =  {
	view: false,
	item: null,
	items: [],
	type: null,
	my_list: JSON.parse(localStorage.getItem('mywatchlist')) || []
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
				type: action.payload.type
			}
		case SET_FILTER:
			if(action.payload.type === 'mywatchlist'){
				state.my_list = action.payload.data
			}
			return {
				...state,
				items: action.payload
			}
		case ADD_ITEM:
			if(state.my_list.every(item => item.id !== action.payload.id)){
				state.my_list.push(action.payload)
			}
			localStorage.setItem('mywatchlist', JSON.stringify(state.my_list))
				return {
				...state,
				my_list: [...state.my_list]
				} 
		case DELETE_ITEM:
			const items = state.my_list.filter(item => item.id !== action.payload)
			localStorage.setItem('mywatchlist', JSON.stringify(items))
			return {
				...state,
				my_list: [...items]
			}
		case SET_TYPE:
			return {
				...state,
				type: action.payload
			}
		default:
			return state;
	}
}

export default reducer