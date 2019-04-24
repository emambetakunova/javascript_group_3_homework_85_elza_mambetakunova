import axios from "../../axios-api";
import {push} from 'connected-react-router';

export const FETCH_TRACK_HISTORY_SUCCESS = 'FETCH_TRACK_HISTORY_SUCCESS';
export const FETCH_TRACK_HISTORY_FAILURE = "FETCH_TRACK_HISTORY_FAILURE";

export const ADD_TRACK_SUCCESS = "ADD_TRACK_SUCCESS";
export const ADD_TRACK_FAILURE = "ADD_TRACK_FAILURE";

const fetchTrackHistorySuccess = data => ({type: FETCH_TRACK_HISTORY_SUCCESS, data});

const fetchTrackHistoryFailure = error => ({type: FETCH_TRACK_HISTORY_FAILURE, error});

const addTrackSuccess = () => ({type: ADD_TRACK_SUCCESS});

const addTrackFailure = error => ({type: ADD_TRACK_FAILURE, error});

export const fetchTrackHistory = () => {
    return (dispatch, getState) => {
        const user = getState().user.user;
        if(!user) {
            dispatch(push('/login'))
        }else {
            const header = {headers: {'Authorization': user.token}};
            return axios.get('/trackHistory', header).then(
                response => {
                    dispatch(fetchTrackHistorySuccess(response.data))
                },
                error => {dispatch(fetchTrackHistoryFailure(error))}
            )
        }

    }
};

export const addToTrackHistory = trackData => {
    return (dispatch, getState) => {
        const user = getState().user.user;
        if(!user) {
            dispatch(push('/login'))
        }else {
            let token = getState().user.user.token;
            const header = {headers: {'Authorization': token}};

            return axios.post('/trackHistory', trackData, header).then(
                () => {
                    dispatch(addTrackSuccess())
                },
                error => {
                    dispatch(addTrackFailure(error))
                }
            )
        }
    }
};