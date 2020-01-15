import React, { Component } from 'react';
import axios from 'axios';

const Reply = props => (
    <div  style={{border: "1px solid", margin: "10px", padding: "10px"}}>
        <p>{props.reply._id}  ||  Created on: {props.reply.createdAt}</p>
        <h4>{props.reply.comment}</h4>
        <button>Report</button>
    </div>
)

export default class Replies extends Component {
    constructor(props){
        super(props);

        this.state = {
          replies: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3000/blog/api/replies/${id}`)
            .then(response => {
                this.setState({
                    replies: response.data.replies
                })
            })
            .catch(error => console.log(error))
    }

    replyList() {
        return this.state.replies.map(currentreply => {
            return <Reply reply={currentreply} key={currentreply._id} />
        })
    }

    render(){
        return(
            <div>
            <p>Here goes all the replies from the id</p>
              <div id="reply">
                  {this.replyList()}
              </div>
            </div>
            
        )
    }
}