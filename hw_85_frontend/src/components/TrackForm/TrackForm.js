import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class TrackForm extends Component {
    state = {
        title: '',
        length: '',
        artist: '',
        album: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.onSubmit(this.state);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="artist"
                    title="Artist"
                    type="select" required
                    onChange={this.inputChangeHandler}
                    value={this.state.artist}
                >
                    <option value="">Please select artist</option>
                    {this.props.artists.map(artist => (
                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                    ))}
                </FormElement>
                <FormElement
                    propertyName="album"
                    title="Album"
                    type="select" required
                    onChange={this.inputChangeHandler}
                    value={this.state.album}
                >
                    <option value="">Please select album</option>
                    {this.props.albums.map(album => (
                        <option key={album._id} value={album._id}>{album.title}</option>
                    ))}
                </FormElement>
                <FormElement
                    propertyName="title"
                    title="Title"
                    type="text" required
                    onChange={this.inputChangeHandler}
                    value={this.state.title}
                />
                <FormElement
                    propertyName="length"
                    title="Length"
                    type="text"
                    onChange={this.inputChangeHandler}
                    value={this.state.length}
                />
                <FormGroup row>
                    <Col sm={{offset: 2, size: 10}}>
                        <Button type="submit" color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default TrackForm;