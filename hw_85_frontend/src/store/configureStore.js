import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import {loadState, saveState} from "./localStorage";
import axios from '../axios-api';

import artistReducer from "./reducers/artistReducer";
import albumReducer from "./reducers/albumReducer";
import trackReducer from "./reducers/trackReducer";
import trackHistoryReducer from "./reducers/trackHistoryReducer";
import userReducer from "./reducers/userReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
    trackHistory: trackHistoryReducer,
    user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
    saveState({
        user: {
            user: store.getState().user.user
        }
    });
});

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().user.user.token;
    } catch (e) {
        // do nothing, user is not logged in
    }


    return config;
});

export default store;