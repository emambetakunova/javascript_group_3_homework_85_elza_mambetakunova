import React from 'react';
import {Col, Row, Card, CardBody, CardTitle} from "reactstrap";

import ArtistThumbnail from "../ArtistThumbnail/ArtistThumbnail";

const ArtistComponent = props => {
    return (
        <Row>
            <Col xs="6">
                <Card color="info" className="mb-5" onClick={props.onClick}>
                    <CardBody>
                        <ArtistThumbnail image={props.image}/>
                        <CardTitle><strong>{props.name}</strong></CardTitle>
                        <strong>Full name: </strong>{props.description}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ArtistComponent;