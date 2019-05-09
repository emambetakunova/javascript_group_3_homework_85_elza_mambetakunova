import React from 'react';
import {Col, Row, Card, CardBody, CardTitle, Button} from "reactstrap";

import ArtistThumbnail from "../ArtistThumbnail/ArtistThumbnail";

const ArtistComponent = props => {
    return (
        <Row>
            <Col xs="6">
                <Card color="info" className="mb-5">
                    <CardBody>
                        <ArtistThumbnail image={props.image}/>
                        <CardTitle><strong>{props.name}</strong></CardTitle>
                        <strong>Full name: </strong>{props.description}
                        <CardTitle>
                            <Button type="submit" color="secondary" onClick={props.onClick}>View albums</Button>
                        </CardTitle>
                        {props.user && props.user.role === 'admin' ?
                            <CardBody>
                                <CardTitle>
                                    <span><strong>Publish/Unpublish: </strong>
                                        <input checked={props.artist.published}
                                               type="checkbox"
                                               onChange={()=> props.published(props.artist._id)}/>
                                    </span>
                                </CardTitle>
                                <CardTitle>
                                    <Button type="submit" color="secondary" onClick={props.delete}>Delete</Button>
                                </CardTitle>
                            </CardBody> : null}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ArtistComponent;