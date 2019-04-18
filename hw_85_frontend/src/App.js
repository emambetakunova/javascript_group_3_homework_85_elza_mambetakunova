import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import Container from "reactstrap/es/Container";

import ArtistsBuilder from "./containers/ArtistsBuilder/ArtistsBuilder";
// import Artist from "./containers/Artist/Artist";
// import Album from "./containers/Album/Album";


class App extends Component {
    render() {
        return (
            <div>
                <Container className="mt-5">
                    <Switch>
                        <Route path="/" exact component={ArtistsBuilder}/>
                        {/*<Route path="/artists/:id" component={Artist}/>*/}
                        {/*<Route path="/albums/:id" component={Album}/>*/}
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default App;