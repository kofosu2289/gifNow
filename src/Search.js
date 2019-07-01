import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar className="Navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a className="pageName">giphyNow </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <form onSubmit={this.props.search}>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={this.props.query}
                  onChange={this.props.handleChange}
                />
              </FormGroup>{' '}
              <button className='button search-btn' type="submit">Search</button>
            </Navbar.Form>
          </form>
        </Navbar.Collapse>
      </Navbar>
        );
    }
}

export default Search;
