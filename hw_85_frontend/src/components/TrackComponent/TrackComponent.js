import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle} from "reactstrap";

const TrackComponent = props => {
    return (
        <Card color="info" className="mb-5">
            <CardBody className="ml-5">
                <CardTitle><strong>Title: </strong>{props.title}</CardTitle>
                <CardSubtitle><strong>Track number: </strong>{props.number}</CardSubtitle>
                <CardSubtitle><strong>Track length: </strong>{props.length}</CardSubtitle>
            </CardBody>
        </Card>
    );
};

export default TrackComponent;