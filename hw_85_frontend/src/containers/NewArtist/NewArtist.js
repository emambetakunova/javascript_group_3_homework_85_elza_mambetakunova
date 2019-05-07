import React, {Component, Fragment} from 'react';
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {createArtist} from "../../store/actions/artistActions";
import {connect} from "react-redux";

class NewArtist extends Component {

    createArtist = artistData => {
        this.props.createArtist(artistData).then(() => {
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <Fragment>
                <h2>New artist</h2>
                <ArtistForm
                    onSubmit={this.createArtist}
                />
            </Fragment>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    createArtist: artistData => dispatch(createArtist(artistData))
});

export default connect(null, mapDispatchToProps)(NewArtist);
