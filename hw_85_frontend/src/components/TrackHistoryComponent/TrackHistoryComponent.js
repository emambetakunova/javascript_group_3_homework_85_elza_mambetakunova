import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle} from "reactstrap";


const TrackHistory = props => {
    return (
        <Card color="info" className="mb-5">
            <CardBody className="ml-5">
                <CardTitle><strong>Artist: </strong>{props.artist}</CardTitle>
                <CardSubtitle><strong>Track: </strong>{props.track.title}</CardSubtitle>
                <CardSubtitle><strong>Date: </strong>{props.datetime}</CardSubtitle>
            </CardBody>
        </Card>
    );
};

export default TrackHistory;