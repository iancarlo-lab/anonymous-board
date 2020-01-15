import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


function WarningBanner(props) {
    if (!props.warn) {
      return null;
    }
  
    return (
      <div className="warning">
        Delete thread
        <input type="password"
            placeholder="password to delete"
            className="form-control"
            >
        </input>
      </div>
    );
}
  
class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          showWarning: true
        }
    }
  
    handleToggleClick = () => {
      this.setState(prevState => ({
        showWarning: !prevState.showWarning
      }));
    }
    
    render() {
      return (
        <div>
          <WarningBanner warn={this.state.showWarning} />
          <button onClick={this.handleToggleClick}>
            {this.state.showWarning ? 'Hide' : 'Show'}
          </button>
        </div>
      );
    }
}
  

export default class ThreadList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            threads: [],
            delete: false,
            password: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/blog/api/threads')
            .then(response => {
                this.setState({
                    threads: response.data
                })
            })
            .catch(error => console.log(error))
    }
    

    threadList() {
        return this.state.threads.map((currentthread) => {
            return (<div  key={currentthread._id}>
                        <div style={{border: "1px solid", margin: "5px", padding: "10px"}}>
                            <br/>
                            <p>Id: {currentthread._id} || Created on: {currentthread.createdAt}</p>
                            <h4>{currentthread.title}</h4>
                            <h5>{currentthread.comment}</h5>
                            <Link to={'/replies/'+currentthread._id} className="btn btn-primary">See all threads</Link>
                            &nbsp;
                            <Link to={'/replies/add/'+currentthread._id} className="btn btn-success">Create thread</Link>
                            &nbsp;
                            <button className="btn btn-danger" onClick= {() => this.onDelete(currentthread._id)}>Delete
                            </button>
                            <input type="password"
                                placeholder="password to delete"
                                value={this.state.password}
                                onChange={this.onPassword}></input>
                            <br/>
                        </div>
                    </div>
            )
        });
    }

    onPassword = (e) => {
        e.preventDefault();

        this.setState({
            password: e.target.value
        })
    }

    onDelete = (id) => {
        const someOtherPassword = this.state.password;
        axios({
            method: 'delete',
            url: `http://localhost:3000/blog/api/threads/delete/${id}`,
            data: {
                password: someOtherPassword
            }
        })
        .then(res => {
            console.log(res.data)
            alert(res.data);
            window.location='/threads'
        })
        .catch(error =>{
                alert(error)
                 console.log("No password added dude!:  " + error)
                 window.location ='/threads'

        });
    }


    render(){
        return(
            <div>
                <div id="thread-list">
                    <h3>Welcome to anonymous board general page </h3>
                        <div id="thread">
                            {this.threadList()}
                        </div>
                </div>
            </div>
        )
    }
}


    /*async componentDidUpdate(prevProps){
        if(prevProps.threads !== this.props.threads){
        await axios.get('https://localhost:3000/blog/api/threads')
        .then(response => {
            this.setState({
                threads: response.data
            })
            console.log("This data comes from Did Update: " + response.data)
        })
        .catch(error => console.log(error));
      }
      console.log("Didnt go through the axios get request!")
    }*/