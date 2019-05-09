import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle, Button} from "reactstrap";
import AlbumThumbnail from "../AlbumThumbnail/AlbumThumbnail";


const AlbumComponent = props => {
    return (
        <Card color="info" className="mb-5">
            <CardBody className="ml-5">
                <AlbumThumbnail image={props.image}/>
                <CardTitle><strong>Title: </strong>{props.title}</CardTitle>
                <CardSubtitle><strong>Release: </strong>{props.release}</CardSubtitle>
                <CardTitle>
                    <Button type="submit" color="secondary" onClick={props.onClick}>View tracks</Button>
                </CardTitle>
                {props.user && props.user.role === 'admin' ?
                    <CardBody>
                        <CardTitle>
                            <span><strong>Publish/Unpublish: </strong>
                                <input checked={props.album.published}
                                       type="checkbox"
                                       onChange={()=> props.published(props.album._id)}/>
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

export default AlbumComponent;