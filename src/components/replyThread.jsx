import React, { Component } from 'react';
import axios from 'axios';

export default class replyThread extends Component {

    constructor(props){
        super(props);

        this.state = {
            comment: '',
            password: '',
            replies: []
        }
    
    }

    onChangeComment = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
         const id = this.props.match.params.id

        const subthread = {
            comment: this.state.comment,
            password: this.state.password
        }

        axios.post(`http://localhost:3000/blog/api/replies/add/${id}`, subthread)
            .then(res => console.log(res.data));

            alert("Subthread added succesfully!" )
            window.location = `/replies/${id}`;
    }


    render(){
        return(
        <div>
         <h3>Here you can post a sub-thread </h3>
         <br />
         <h5> Submit a new sub-thread</h5>
         <br />
             <form onSubmit={this.onSubmit}>
              <div className="form-group">
               <input type="text"
                    placeholder="Comment"
                    required
                    className="form-control"
                    value={this.state.comment}
                    onChange={this.onChangeComment} />
                    </div>
                <br />
                <div className="form-group">
                <input type="password"
                    placeholder="password to delete"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword} />
                    </div>
                <br />
                <div className="form-group">
                <input type="submit"
                    value="Submit"
                    className="btn btn-primary" />
                </div>
            </form>
        </div>
        )
    }
}