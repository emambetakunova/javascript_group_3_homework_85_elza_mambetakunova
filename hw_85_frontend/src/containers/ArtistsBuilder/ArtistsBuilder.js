import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchArtists} from "../../store/actions/artistAction";

import ArtistComponent from "../../components/ArtistComponent/ArtistComponent";


class ArtistsBuilder extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    }

    getArtist = id => {
        this.props.history.push({
            pathname: '/artists/' + id
        })
    };

    render() {
        return (
            <Fragment>
                <h1>Artists</h1>
                {this.props.artists.map(artist => (
                    <ArtistComponent
                        key={artist._id}
                        image={artist.image}
                        artist={artist.name}
                        onClick={() => this.getArtist(artist._id)}/>
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: state.artist.artists
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArtists: () => dispatch(fetchArtists())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsBuilder);