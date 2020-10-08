import { BorderAllRounded } from '@material-ui/icons';
import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ProfileCard(props){
        return(
            <Card style={{ width: '18rem', marginBottom:"2em", borderRadius: "15px"}}>
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text
                        style={{
                        display:'flex',
                        alignSelf:"flex-end",
                        alignItems: "flex-end",
                        justifyContent: "flex-end"
                        
                        }}>
                        {props.marks}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

