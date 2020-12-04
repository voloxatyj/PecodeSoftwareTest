export const initialState =  {
	characters: [], 
	episodes: [], 
	locations: [], 
	myWatchList: []
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case "LOAD_CHARACTERS":
			return {
				...state,
				characters: [state.characters, ...action.payload]
			}
		case "LOAD_EPISODES":
			return {
				...state,
				episodes: [state.episodes, ...action.payload]
			}
		case "LOAD_LOCATIONS":
			return {
				...state,
				locations: [state.locations, ...action.payload]
			}			
		default:
			return state;
	}
}

export default reducer