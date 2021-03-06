import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import '../css/GifsContainer.css';

class GifsContainer extends Component {
  
  decideDisplay = () => {
    if (this.props.isFeed === true) {
      return (
        this.props.gifs.map((gif) =>
          <figure key={gif.id} className="effect-sarah" onClick={(event) => this.props.action(event, gif.url)}>
            <span>
              <img src={gif.url} alt="A gif" />
            </span>
            <figcaption>
              <h2><FontAwesomeIcon icon={this.props.icon} /></h2>
            </figcaption>
          </figure>
        )
      );
    } else if(this.props.isFeed === false) {
      return (
        this.props.searchGifs.map((gif) =>
          <figure key={gif.id} className="effect-sarah" onClick={(event) => this.props.action(event, gif.url)}>
            <span>
              <img  src={gif.url} alt="A gif" />
            </span>
            <figcaption>
              <h2><FontAwesomeIcon icon={this.props.icon} /></h2>
            </figcaption>
          </figure>
        )
      );
    } else {
      return (
        this.props.gifs.map((gif) =>
          <figure key={gif.id} className="effect-sarah" onClick={(event) => this.props.action(event, gif)}>
            <span>
              <img  src={gif} alt="A gif" />
            </span>
            <figcaption>
              <h2><FontAwesomeIcon  icon={this.props.icon} /><br /><a className='gif-title' href={gif.url}>{gif.title}</a></h2>
            </figcaption>
          </figure>
        )
      );
    }
  }

  render() {
    const gifs = this.decideDisplay();
    
    return (
      <div className="grid">
        {gifs}
      </div>
    );
  }
}

export default GifsContainer;