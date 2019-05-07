import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchArtists, deleteArtist, publishedArtist} from "../../store/actions/artistActions";

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

    goDelete = id => {
        this.props.deleteArtist(id)
    };

    goPublish = id => {
        this.props.publishedArtist(id)
    };

    render() {
        return (
            <Fragment>
                <h1>Artists</h1>
                {this.props.artists.map(artist => (
                    <ArtistComponent
                        user={this.props.user}
                        delete={() => this.goDelete(artist._id)}
                        published={this.goPublish}
                        key={artist._id}
                        image={artist.image}
                        name={artist.name}
                        artist={artist}
                        description={artist.description}
                        onClick={() => this.getArtist(artist._id)}/>
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: state.artist.artists,
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArtists: () => dispatch(fetchArtists()),
        deleteArtist: id => dispatch(deleteArtist(id)),
        publishedArtist: id => dispatch(publishedArtist(id))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsBuilder);