import React, { Component } from 'react';
import "./../../container/CreatePost/CreatePost.css";


class NewPost extends Component {

    state = {
        title: 'CZ3006 ASE',
        content: '',
        tags: 'CZ3006 ASE'
    }
    render(){
        return(
          
  
          <div className="rightsection_createpost">
            <div className="NewPost">
                  <h1>Add a Post</h1>
                  <label>Title</label>
                  <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                  <label>Content</label>
                  <textarea rows="10" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                  <label>Tags</label>
                  <select value={this.state.tags} onChange={(event) => this.setState({tags: event.target.value})}>
                      <option value="CZ3006">CZ3006 ASE</option>
                      <option value="CZ3001">CZ3001 ACOA</option>
                  </select>
                  <button >Add Post</button>
              </div>
            </div>
          
        
        );
    }
}

export default NewPost;