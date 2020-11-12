import React ,{useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function DeletePostPopup(props) {
    const [content, setContent]= useState(props.prevContent);

    const contentHandler=(evt)=>{
        setContent(evt.target.value);
    }
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {props.isDelete?  "Delete": "Edit" }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.isDelete?<p>
                    Confirm Delete?
                    </p>:
                    <input type="text" value={content} style={{width:'100%'}} onChange={contentHandler}/>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{
                        props.onHide(true); 
                        if(!props.isDelete){
                            props.editPost(content)
                        }
                        else{
                            props.deleteComment();
                        }
                        }

                    } >Confirm</Button>
                    <Button onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
                </Modal>
        );
    


}