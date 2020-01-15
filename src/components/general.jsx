import React, { Component } from 'react';
//import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap';
import social from '../media/social.jpg';

export default class General extends Component {
    constructor(props){
        super(props);

        this.state = {
            threads: []
        }
    }


    render(){
        return(
            <div id="threads-list">
             <h2>Welcome to the general board</h2>
             <br/>
             <h3>This is a space where you can have anonymous communication between other users, feel free to talk about whatever topic is in your mind!</h3>
             <br/>
              <div id="menu-options">
                  <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src={social} height="130px" width="100px"/>
                    <Card.Body>
                        <Card.Title>Open new discussion</Card.Title>
                        <Card.Text>
                        Start by simply posting a title, your comments and a password is required in case you want
                        to delete the existing posts.
                        That way we ensure other users can't delete existing posts.
                        </Card.Text>
                        <Button variant="primary" href='/create'>
                          Create new thread
                        </Button>
                    </Card.Body>
                    </Card>
              </div>
            </div>
        )
    }
}