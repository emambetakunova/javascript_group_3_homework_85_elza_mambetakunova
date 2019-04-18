import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";

import {fetchArtistsId} from "../../store/actions/artistAction";
import {fetchAlbumsArtist} from "../../store/actions/albumActions";

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

    render() {
        return (
            <Fragment>
                <h3>{this.props.artists.name}</h3>
                <CardColumns>
                    {this.props.albums.map(album => (
                        <AlbumComponent
                            key={album._id}
                            image={album.image}
                            title={album.title}
                            release={album.release}
                            onClick={() => this.getAlBumId(album._id)}/>
                    ))}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        artists: state.artist.artistId,
        albums: state.album.albums
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArtistsId: (id) => dispatch(fetchArtistsId(id)),
        fetchAlbumsArtist: id => dispatch(fetchAlbumsArtist(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);