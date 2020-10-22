import React, { Component } from 'react';
import "./../../container/CreateForum/CreateForum.css";

class NewForum extends Component {

    state = {
        forumtype: 'main',
        title: 'CZ3002 ASE',
        content: '',
    }
    render(){
        return(
          
  
          <div className="rightsection_createforum">
            <div className="NewForum">
                  <h1>Create Forum</h1>
                  <label>Forum Type</label>
                  <select value={this.state.forumtype} onChange={(event) => this.setState({forumtype: event.target.value})}>
                      <option value="main">Main Forum</option>
                      <option value="sub">Sub Forum</option>
                  </select>
                  <label>Forum Title</label>
                  <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                  <label>Description</label>
                  <textarea rows="10" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                  <button >Create Forum</button>
              </div>
            </div>
          
        
        );
    }
}

export default NewForum;
