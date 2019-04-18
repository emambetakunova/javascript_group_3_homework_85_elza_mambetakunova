import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createBrowserHistory} from 'history';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import artistReducer from './store/reducers/artistReducer';
import albumReducer from "./store/reducers/albumReducer";
import trackReducer from "./store/reducers/trackReducer";

const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
