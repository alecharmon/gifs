import React, { Component } from 'react';
import axios from 'axios';
import {Button, InputGroup, FormControl, FormGroup } from 'react-bootstrap';
import _ from 'lodash';
class GifSearch extends Component {

  constructor(){
    super()
    this.state = {
      results : [],
      query   : 'dank memes'
    }
  }

  getGif(obj){
    return {
      url: obj.images.downsized.url
    }
  }

  search(){
    const key = 'dc6zaTOxFJmzC'
    const giphy = 'http://api.giphy.com/v1/gifs/search?q='
    const query_gipfy = `${giphy}${encodeURI('clovis is silly')}&api_key=${key}`
    axios.get(query_gipfy)
      .then(resp => {
          this.setState({
            results: _.map(resp.data.data, this.getGif),
          });
        });
  }

  handleUpdate(name){
    //I'm flexin here but ask me whats going on, its 🔑 
    return (event) => {
      this.setState({[name]: event.target.value})
    }
  }


  renderSearchBar(){
    return(
      <FormGroup>
        <InputGroup>
          <FormControl
            value={this.state.query}
            onChange={this.handleUpdate('query').bind(this)}
            type="text" />
          <InputGroup.Button>
            <Button
             onClick={this.search.bind(this)}>
              Click Me
             </Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    )
  }

  render() {
    return (
      <div>
      {this.renderSearchBar()}

      {this.state.results.map(e => <img src={e.url} />) }
      </div>
    );
  }
}


export default GifSearch;
