import axios from "../../axios-api";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = "FETCH_TRACKS_FAILURE";
export const CREATE_TRACK_SUCCESS = "CREATE_TRACK_SUCCESS";

const fetchTracksSuccess = data => ({type: FETCH_TRACKS_SUCCESS, data});

const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});

export const fetchTracks = (id) => {
    return dispatch => {
        return axios.get('/tracks/?album=' + id).then(
            response => dispatch(fetchTracksSuccess(response.data)),
            error => dispatch(fetchTracksFailure(error))
        );
    };
};

export const createTrack = trackData => {
    console.log(trackData);
    return dispatch => {
        return axios.post('/tracks', trackData).then(
            () => dispatch(createTrackSuccess())
        );
    };
};