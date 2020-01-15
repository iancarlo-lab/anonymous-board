import React, { Component } from 'react';
import axios from 'axios';

export default class createThread extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            comment: '',
            password: ''
        }
    }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onChangeComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const thread = {
            title: this.state.title,
            comment: this.state.comment,
            password: this.state.password
        }

        axios.post('http://localhost:3000/blog/api/threads/create', thread)
            .then(res => console.log(res.data));
        
            alert("Thread created succesfully! " + this.state.title)
            window.location = '/threads';

    }

    render(){
        return(
            <div>
            <h3>Submit a new thread:</h3>
             <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                  <input type="text"
                    placeholder="Title"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                     />
                 </div>
                 <div className="form-group">
                  <input type="text"
                    placeholder="Tell us about it"
                    required
                    className="form-control"
                    value={this.state.comment}
                    onChange={this.onChangeComment}
                     />
                 </div>
                 <div className="form-group">
                  <input type="password" 
                    placeholder="password to delete"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                 </div>
                 <div className="form-group">
                  <input type="submit"
                    value="Submit"
                    className="btn btn-primary"
                    />
                 </div>
             </form>
            </div>
        )
    }
}