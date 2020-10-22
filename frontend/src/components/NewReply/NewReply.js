import React, { Component } from 'react';
import "./../../container/ReplyPage/ReplyPage.css";

class NewReply extends Component {

    state = {
        title: 'CZ3002 ASE',
        content: '',
        tags: 'CZ3002 ASE'
    }
    render(){
        return(
          
  
          <div className="rightsection_replypage">
            <div className="NewReply">
                  <h1>Add a Reply</h1>
                  <label>Title</label>
                  <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                  <label>Content</label>
                  <textarea rows="10" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                  <label>Tags</label>
                  <select value={this.state.tags} onChange={(event) => this.setState({tags: event.target.value})}>
                      <option value="CZ3002">CZ3002 ASE</option>
                      <option value="CZ3001">CZ3001 ACOA</option>
                  </select>
                  <button >Add Reply</button>
              </div>
            </div>
          
        
        );
    }
}

export default NewReply;
