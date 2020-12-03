export const initialState =  {
	characters: [], 
	episodes: [], 
	locations: [], 
	myWatchList: []
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case "PAGGINATION":
				return {
					...state
				}

		default:
			return state;
	}
}

export default reducer