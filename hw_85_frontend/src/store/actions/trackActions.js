import axios from "../../axios-api";
import {push} from "connected-react-router";

export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';

export const FETCH_TRACKS_FAILURE = "FETCH_TRACKS_FAILURE";

export const DELETE_TRACK_SUCCESS = "DELETE_TRACK_SUCCESS";

export const DELETE_TRACK_FAILURE = "DELETE_TRACK_FAILURE";

export const CREATE_TRACK_SUCCESS = "CREATE_TRACK_SUCCESS";

export const PUBLISH_TRACK_SUCCESS = "PUBLISH_TRACK_SUCCESS";

const fetchTracksSuccess = data => ({type: FETCH_TRACKS_SUCCESS, data});

const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});

const deleteTrackFailure = () => ({type: DELETE_TRACK_FAILURE});

const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});

const publishedTrackSuccess = () => ({type: PUBLISH_TRACK_SUCCESS});

export const fetchTracks = (id) => {
    return dispatch => {
        return axios.get('/tracks/?album=' + id).then(
            response => dispatch(fetchTracksSuccess(response.data)),
            error => dispatch(fetchTracksFailure(error))
        );
    };
};

export const deleteTrack = id => {
    return (dispatch, getState) => {
        let token = getState().user.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.delete('/tracks/' + id, header).then(
            () => {
                dispatch(deleteTrackSuccess());
                dispatch(push('/'));
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(deleteTrackFailure(error.response.data));
                } else {
                    dispatch(deleteTrackFailure({global: 'No connection'}))
                }
            }
        );
    };
};

export const createTrack = trackData => {
    return dispatch => {
        return axios.post('/tracks', trackData).then(
            () => dispatch(createTrackSuccess())
        );
    };
};

export const publishedTrack = id => {
    return dispatch => {
        return axios.post('/tracks/' + id + '/toggle_published').then(
            () => dispatch(publishedTrackSuccess())
        );
    };
};