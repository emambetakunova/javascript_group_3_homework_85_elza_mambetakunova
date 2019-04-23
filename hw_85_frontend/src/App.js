import React, {Component, Fragment} from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "./store/actions/userActions";
import Container from "reactstrap/es/Container";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ArtistsBuilder from "./containers/ArtistsBuilder/ArtistsBuilder";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";


class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar
                        user={this.props.user}
                        logout={this.props.logoutUser}
                    />
                </header>
                <Container className="mt-5">
                    <Switch>
                        <Route path="/" exact component={ArtistsBuilder}/>
                        <Route path="/artists/:id" component={Artist}/>
                        <Route path="/albums/:id" component={Album}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));