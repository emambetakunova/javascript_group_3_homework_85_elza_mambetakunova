import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";

import {fetchTracks} from "../../store/actions/trackActions";
import {fetchAlbumsId} from "../../store/actions/albumActions";
import {addToTrackHistory} from "../../store/actions/trackHistoryActions"

import TrackComponent from "../../components/TrackComponent/TrackComponent";


class Album extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchTracks(id);
        this.props.fetchAlbumsId(id);
    }

    goTrackHistory = (id) => {
        this.props.addToTrackHistory({track: id});
    };

    render() {
        return (
            <Fragment>
                <h3><strong>Artist: </strong>{this.props.artistAlbum}</h3>
                <h3><strong>Album: </strong>{this.props.albumId.title}</h3>
                {this.props.tracks ? <CardColumns>
                    {this.props.tracks.map(track => {
                        console.log(track);
                        return (
                            <TrackComponent
                                key={track._id}
                                title={track.title}
                                number={track.number}
                                length={track.length}
                                onClick={() => this.goTrackHistory(track._id)}
                            />
                        )
                    })}
                </CardColumns> : null}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.track.tracks,
        albumId: state.album.albumId,
        artistAlbum: state.album.artistAlbum
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTracks: (id) => dispatch(fetchTracks(id)),
        fetchAlbumsId: (id) => dispatch(fetchAlbumsId(id)),
        addToTrackHistory: (id) => dispatch(addToTrackHistory(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);