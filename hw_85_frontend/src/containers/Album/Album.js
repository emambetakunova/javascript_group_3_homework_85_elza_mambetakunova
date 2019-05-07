import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";

import {fetchTracks, deleteTrack, publishedTrack} from "../../store/actions/trackActions";
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

    goDelete = id => {
        this.props.deleteTrack(id)
    };

    goPublish = id => {
        this.props.publishedTrack(id)
    };

    render() {
        console.log(this.props.tracks);
        return (
            <Fragment>
                {/*<h3><strong>Artist: </strong>{this.props.artistAlbum}</h3>*/}
                <h3><strong>Album: </strong>{this.props.albumId.title}</h3>
                {this.props.tracks ? <CardColumns>
                    {this.props.tracks.map(track => {
                        return (
                            <TrackComponent
                                user={this.props.user}
                                delete={() => this.goDelete(track._id)}
                                published={this.goPublish}
                                key={track._id}
                                title={track.title}
                                number={track.number}
                                length={track.length}
                                track={track}
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
        user: state.user.user,
        albumId: state.album.albumId,
        artistAlbum: state.album.artistAlbum
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTracks: (id) => dispatch(fetchTracks(id)),
        fetchAlbumsId: (id) => dispatch(fetchAlbumsId(id)),
        addToTrackHistory: (id) => dispatch(addToTrackHistory(id)),
        deleteTrack: id => dispatch(deleteTrack(id)),
        publishedTrack: id => dispatch(publishedTrack(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Album);