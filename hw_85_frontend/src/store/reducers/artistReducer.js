import {FETCH_ARTISTS_SUCCESS, FETCH_ARTISTS_FAILURE, FETCH_ARTIST_ID_SUCCESS } from "../actions/artistActions";

const initialState = {
    artists: [],
    artistId: [],
    error: null
};

const artistReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.data
            };
        case FETCH_ARTISTS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_ARTIST_ID_SUCCESS:
            return {
                ...state,
                artistId: action.data
            };
        default:
            return state;
    }
};
export default artistReducer;