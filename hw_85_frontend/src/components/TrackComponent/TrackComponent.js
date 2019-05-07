import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, Button} from "reactstrap";

const TrackComponent = props => {
    return (
        <Card color="info" className="mb-5">
            <CardBody className="ml-5" onClick={props.onClick}>
                <CardTitle><strong>Title: </strong>{props.title}</CardTitle>
                <CardSubtitle><strong>Track number: </strong>{props.number}</CardSubtitle>
                <CardSubtitle><strong>Track length: </strong>{props.length}</CardSubtitle>
                {props.user && props.user.role === 'admin' ?
                    <CardBody>
                        <CardTitle>
                            <span><strong>Publish/Unpublish: </strong>
                                <input checked={props.track.published}
                                       type="checkbox"
                                       onChange={()=> props.published(props.track._id)}/>
                            </span>
                        </CardTitle>
                        <CardTitle>
                            <Button type="submit" color="secondary" onClick={props.delete}>Delete</Button>
                        </CardTitle>
                    </CardBody> : null}
            </CardBody>
        </Card>
    );
};

export default TrackComponent;