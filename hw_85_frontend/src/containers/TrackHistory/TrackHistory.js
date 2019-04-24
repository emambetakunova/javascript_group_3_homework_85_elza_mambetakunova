import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {CardColumns} from "reactstrap";
import {fetchTrackHistory} from "../../store/actions/trackHistoryActions";

import TrackHistoryComponent from "../../components/TrackHistoryComponent/TrackHistoryComponent";


class TrackHistory extends Component {
    componentDidMount() {
            this.props.fetchTrackHistory();
    }

    render() {
        return (
            <Fragment>
                <h1>Track History</h1>
                {this.props.trackHistory ? <CardColumns>
                        {this.props.trackHistory.map(trackHistory => {
                            return (
                                <TrackHistoryComponent
                                    key={trackHistory._id}
                                    track={trackHistory.track}
                                    artist={trackHistory.track.album.artist.name}
                                    datetime={trackHistory.datetime}
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
        user: state.user.user,
        trackHistory: state.trackHistory.trackHistory
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTrackHistory: () => dispatch(fetchTrackHistory())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);