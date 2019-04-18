import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle} from "reactstrap";
import AlbumThumbnail from "../AlbumThumbnail/AlbumThumbnail";


const AlbumComponent = props => {
    return (
        <Card color="info" className="mb-5" onClick={props.onClick}>
            <CardBody className="ml-5">
                <AlbumThumbnail image={props.image}/>
                <CardTitle><strong>Title: </strong>{props.title}</CardTitle>
                <CardSubtitle><strong>Release: </strong>{props.release}</CardSubtitle>
            </CardBody>
        </Card>
    );
};

export default AlbumComponent;