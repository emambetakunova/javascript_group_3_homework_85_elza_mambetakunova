import React from 'react';
import {Card, CardBody} from "reactstrap";

import ArtistThumbnail from "../ArtistThumbnail/ArtistThumbnail";

const ArtistComponent = props => {
    return (
        <Card color="info" className="mb-5" onClick={props.onClick}>
            <CardBody>
                <ArtistThumbnail image={props.image}/>
                <strong className="ml-5">{props.artist}</strong>
            </CardBody>
        </Card>
    );
};

export default ArtistComponent;