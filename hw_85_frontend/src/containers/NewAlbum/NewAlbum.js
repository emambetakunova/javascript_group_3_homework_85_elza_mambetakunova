import React, {Component, Fragment} from 'react';
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {createAlbum} from "../../store/actions/albumActions";
import {connect} from "react-redux";
import {fetchArtists} from "../../store/actions/artistActions";

class NewAlbum extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    }

    createAlbum = albumData => {
        this.props.createAlbum(albumData).then(() => {
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <Fragment>
                <h2>New album</h2>
                <AlbumForm
                    artists={this.props.artists}
                    onSubmit={this.createAlbum}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artist.artists
});

const mapDispatchToProps = dispatch => ({
    createAlbum: albumData => dispatch(createAlbum(albumData)),
    fetchArtists: () => dispatch(fetchArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);
