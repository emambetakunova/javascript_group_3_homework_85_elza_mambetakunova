import axios from "../../axios-api";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = "FETCH_TRACKS_FAILURE";

const fetchTracksSuccess = data => ({type: FETCH_TRACKS_SUCCESS, data});

const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const fetchTracks = (id) => {
    return dispatch => {
        return axios.get('/tracks/?album=' + id).then(
            response => dispatch(fetchTracksSuccess(response.data)),
            error => dispatch(fetchTracksFailure(error))
        );
    };
};