import axios from "../../axios-api";
import {push} from "connected-react-router";

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';

export const FETCH_ALBUMS_FAILURE = "FETCH_ALBUMS_FAILURE";

export const FETCH_ALBUM_ID_SUCCESS = "FETCH_ALBUM_ID_SUCCESS";

export const DELETE_ALBUM_SUCCESS = "DELETE_ALBUM_SUCCESS";

export const DELETE_ALBUM_FAILURE = "DELETE_ALBUM_FAILURE";

export const CREATE_ALBUM_SUCCESS = "CREATE_ALBUM_SUCCESS";

export const PUBLISH_ALBUM_SUCCESS = "PUBLISH_ALBUM_SUCCESS";

const fetchAlbumsSuccess = data => ({type: FETCH_ALBUMS_SUCCESS, data});

const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, error});

const fetchAlbumsIdSuccess = data => ({type: FETCH_ALBUM_ID_SUCCESS, data});

const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});

const deleteAlbumFailure = () => ({type: DELETE_ALBUM_FAILURE});

const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});

const publishedAlbumSuccess = (album) => ({type: PUBLISH_ALBUM_SUCCESS, album});

export const fetchAlbums = () => {
    return dispatch => {
        return axios.get('/albums').then(
            response => dispatch(fetchAlbumsSuccess(response.data)),
            error => dispatch(fetchAlbumsFailure(error))
        );
    };
};

export const fetchAlbumsArtist = (id) => {
    return dispatch => {
        return axios.get('/albums/?artist=' + id).then(
            response => dispatch(fetchAlbumsSuccess(response.data)),
            error => dispatch(fetchAlbumsFailure(error))
        );
    };
};

export const fetchAlbumsId = (id) => {
    return dispatch => {
        return axios.get('/albums/' + id).then(
            response => dispatch(fetchAlbumsIdSuccess(response.data)),
            error => dispatch(fetchAlbumsFailure(error))
        );
    };
};

export const deleteAlbum = id => {
    return (dispatch, getState) => {
        let token = getState().user.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.delete('/albums/' + id, header).then(
            () => {
                dispatch(deleteAlbumSuccess());
                dispatch(push('/'));
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(deleteAlbumFailure(error.response.data));
                } else {
                    dispatch(deleteAlbumFailure({global: 'No connection'}))
                }
            }
        );
    };
};

export const createAlbum = albumData => {
    return dispatch => {
        return axios.post('/albums', albumData).then(
            () => dispatch(createAlbumSuccess())
        );
    };
};

export const publishedAlbum = id => {
    return dispatch => {
        return axios.post('/albums/' + id + '/toggle_published').then(
            (result) => dispatch(publishedAlbumSuccess(result.data))
        );
    };
};