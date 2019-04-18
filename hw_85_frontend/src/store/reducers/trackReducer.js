import {FETCH_TRACKS_SUCCESS, FETCH_TRACKS_FAILURE} from "../actions/trackActions";

const initialState = {
    tracks: [],
    error: null
};

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.data
            };
        case FETCH_TRACKS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
export default trackReducer;