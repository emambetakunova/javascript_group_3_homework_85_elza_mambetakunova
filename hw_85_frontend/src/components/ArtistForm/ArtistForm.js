import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";

class ArtistForm extends Component {
    state = {
        name: '',
        description: '',
        image: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="name"
                    title="Name"
                    type="text" required
                    onChange={this.inputChangeHandler}
                    value={this.state.name}
                />
                <FormElement
                    propertyName="description"
                    title="Description"
                    type="textarea"
                    onChange={this.inputChangeHandler}
                    value={this.state.description}
                />
                <FormElement
                    propertyName="image"
                    title="Image"
                    type="file"
                    onChange={this.fileChangeHandler}
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

export default ArtistForm;