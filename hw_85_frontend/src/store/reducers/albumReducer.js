import {FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_FAILURE, FETCH_ALBUM_ID_SUCCESS} from "../actions/albumActions";


const initialState = {
    albums: [],
    albumId: [],
    artistAlbum: [],
    error: null
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.data
            };
        case FETCH_ALBUMS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_ALBUM_ID_SUCCESS:
            return {
                ...state,
                albumId: action.data,
                artistAlbum: action.data.artist.name
            };
        default:
            return state;
    }
};
export default albumReducer;