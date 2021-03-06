import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";

import {fetchArtistsId} from "../../store/actions/artistActions";
import {fetchAlbums, deleteAlbum, fetchAlbumsArtist, publishedAlbum} from "../../store/actions/albumActions";

import AlbumComponent from "../../components/AlbumComponent/AlbumComponent";


class Artist extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchAlbumsArtist(id);
        this.props.fetchArtistsId(id);
    }

    getAlBumId = id => {
        this.props.history.push({
            pathname: '/albums/' + id
        })
    };

    goDelete = id => {
        this.props.deleteAlbum(id);
        this.props.history.push({
            pathname: '/'
        })
    };

    changePublishStatus = id => {
        this.props.publishedAlbum(id);
    };

    render() {
        const artistAlbums = this.props.albums.filter(album =>
            album.artist._id === this.props.match.params.id
        );

        let albums = this.props.albums;
        if (albums.length === 0) {
            albums = <h2>Add new albums</h2>;
        } else {
            albums = artistAlbums.map(album => (
                <AlbumComponent
                    user={this.props.user}
                    delete={() => this.goDelete(album._id)}
                    published={this.changePublishStatus}
                    key={album._id}
                    image={album.image}
                    title={album.title}
                    release={album.release}
                    album={album}
                    onClick={() => this.getAlBumId(album._id)}/>
            ));
        }
        return (
            <Fragment>
                <h3>{this.props.artists.name}</h3>
                <CardColumns>
                    {albums}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: state.artist.artistId,
        user: state.user.user,
        albums: state.album.albums,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArtistsId: (id) => dispatch(fetchArtistsId(id)),
        fetchAlbumsArtist: id => dispatch(fetchAlbumsArtist(id)),
        fetchAlbums: () => dispatch(fetchAlbums()),
        deleteAlbum: id => dispatch(deleteAlbum(id)),
        publishedAlbum: id => dispatch(publishedAlbum(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);