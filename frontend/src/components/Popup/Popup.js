import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function DeletePostPopup(props) {

    
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Delete Post
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                    Confirm Delete Post?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Yes</Button>
                    <Button onClick={props.onHide}>No</Button>
                </Modal.Footer>
                </Modal>
        );
    


}