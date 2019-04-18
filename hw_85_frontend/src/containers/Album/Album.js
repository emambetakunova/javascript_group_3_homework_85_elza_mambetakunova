import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";

import {fetchTracks} from "../../store/actions/trackActions";
import {fetchAlbumsId} from "../../store/actions/albumActions";

import TrackComponent from "../../components/TrackComponent/TrackComponent";


class Album extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTracks(id);
        this.props.fetchAlbumsId(id);
    }

    render() {
        return (
            <Fragment>
                <h3>{this.props.artistAlbum}</h3>
                <CardColumns>
                    {this.props.tracks.map(track => (
                        <TrackComponent
                            key={track._id}
                            title={track.title}
                            number={track.number}
                            length={track.length}
                        />
                    ))}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.track.tracks,
        albums: state.album.albums,
        artistAlbum: state.album.artistAlbum
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTracks: (id) => dispatch(fetchTracks(id)),
        fetchAlbumsId: (id) => dispatch(fetchAlbumsId(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);