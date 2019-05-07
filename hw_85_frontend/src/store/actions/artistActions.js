import axios from "../../axios-api";
import {push} from 'connected-react-router';

export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = "FETCH_ARTISTS_FAILURE";
export const FETCH_ARTIST_ID_SUCCESS = "FETCH_ARTIST_ID_SUCCESS";
export const CREATE_ARTIST_SUCCESS = "CREATE_ARTIST_SUCCESS";
export const DELETE_ARTIST_SUCCESS = "DELETE_ARTIST_SUCCESS";
export const DELETE_ARTIST_FAILURE = "DELETE_ARTIST_FAILURE";
export const PUBLISH_ARTIST_SUCCESS = "PUBLISH_ARTIST_SUCCESS";

const fetchArtistsSuccess = data => ({type: FETCH_ARTISTS_SUCCESS, data});

const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, error});

const fetchArtistsIdSuccess = data => ({type: FETCH_ARTIST_ID_SUCCESS, data});

const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});

const deleteArtistFailure = () => ({type: DELETE_ARTIST_FAILURE});

const createArtistSuccess = () => ({type: CREATE_ARTIST_SUCCESS});

const publishedArtistSuccess = () => ({type: PUBLISH_ARTIST_SUCCESS});

export const fetchArtists = () => {
    return dispatch => {
        return axios.get('/artists').then(
            response => dispatch(fetchArtistsSuccess(response.data)),
            error => dispatch(fetchArtistsFailure(error))
        );
    };
};

export const fetchArtistsId = id => {
    return dispatch => {
        return axios.get('/artists/' + id).then(
            response => dispatch(fetchArtistsIdSuccess(response.data)),
            error => dispatch(fetchArtistsFailure(error))
        );
    };
};

export const deleteArtist = id => {
    return (dispatch, getState) => {
        let token = getState().user.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.delete('/artists/' + id, header).then(
            () => {
                dispatch(deleteArtistSuccess());
                dispatch(push('/'));
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(deleteArtistFailure(error.response.data));
                } else {
                    dispatch(deleteArtistFailure({global: 'No connection'}))
                }
            }
        );
    };
};

export const createArtist = artistData => {
    return dispatch => {
        return axios.post('/artists', artistData).then(
            () => dispatch(createArtistSuccess())
        );
    };
};

export const publishedArtist = id => {
    return dispatch => {
        return axios.post('/artists/' + id + '/toggle_published').then(
            () => dispatch(publishedArtistSuccess())
        );
    };
};