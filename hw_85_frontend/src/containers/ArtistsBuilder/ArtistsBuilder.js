import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchArtists, deleteArtist, publishedArtist} from "../../store/actions/artistActions";

import ArtistComponent from "../../components/ArtistComponent/ArtistComponent";
import {CardColumns} from "reactstrap";

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
            .then (() => this.props.fetchArtists())
    };

    changePublishStatus = id => {
        this.props.publishedArtist(id);
    };

    render() {
        let artists = this.props.artists;
        if (artists.length === 0) {
            artists = <h2>Add new artists</h2>;
        } else {
            artists = this.props.artists.map(artist => (
                <ArtistComponent
                    user={this.props.user}
                    delete={() => this.goDelete(artist._id)}
                    published={this.changePublishStatus}
                    key={artist._id}
                    image={artist.image}
                    name={artist.name}
                    artist={artist}
                    description={artist.description}
                    onClick={() => this.getArtist(artist._id)}/>
            ));
        }
        return (
            <Fragment>
                <h1>Artists</h1>
                <CardColumns>
                {artists}
                </CardColumns>
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