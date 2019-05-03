import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import ArtistsBuilder from "./containers/ArtistsBuilder/ArtistsBuilder";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to="/login"/>
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={ArtistsBuilder}/>
            <ProtectedRoute
                isAllowed={user && user.role === 'admin'}
                path="/artists/new"
                exact
                component={NewArtist}
            />
            <ProtectedRoute
                isAllowed={user && user.role === 'admin'}
                path="/albums/new"
                exact
                component={NewAlbum}
            />
            <ProtectedRoute
                isAllowed={user && user.role === 'admin'}
                path="/tracks/new"
                exact
                component={NewTrack}
            />
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
        </Switch>
    );
};

export default Routes;
