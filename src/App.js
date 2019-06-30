import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './App.css';

import Search from './Search';
import Functionalities from './Functionalities';

const GphApiClient = require('giphy-js-sdk-core')

class App extends Component {
  constructor() {
    super();
    this.state = {
      giphy: GphApiClient("8XADJBZWvzB75qIDyCpfWLbnE5otD7wG"),
      searchQuery: "",
      gifs: [],
      favorites: [],
    };
  }

  componentWillMount = () => {
    this.loadFeed();
    this.loadFavorites();
  }

  loadFeed = () => {
    this.state.giphy.trending("gifs", {})
      .then((response) => {
        response.data.forEach((gif) => {
          let newArray = this.state.gifs.slice();
          newArray.push(gif.images.fixed_height_downsampled.gif_url);

          this.setState({
            gifs: newArray,
          });
        })
      }).catch((err) => {
        
      })
  }

  loadFavorites = () => { 
    if (typeof (Storage) !== "undefined") {
      let storageFavorites = localStorage.getItem("favorites");
      if (storageFavorites === null || storageFavorites.length == 0)
          return;

      console.log("Favorites: " + storageFavorites);

      this.setState({
        favorites: storageFavorites
      });
    } else {
      // Sorry! No Web Storage support..
    }
  }

  search = (event) => {
    event.preventDefault();

    this.state.giphy.search('gifs', { "q": this.state.searchQuery })
      .then((response) => {
        this.setState({
          gifs: [],
        });

        response.data.forEach((gif) => {
          let newArray = this.state.gifs.slice();
          newArray.push(gif.images.fixed_height_downsampled.gif_url);

          this.setState({
            gifs: newArray,
          });
        })
      })
      .catch((err) => {
      
      });
  }

  updateQuery = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  addFavorite = (event, gif) => {
    let newArray = this.state.favorites.slice();
    newArray.push(gif);
    this.setState({
      favorites: newArray
    });

    localStorage.setItem("favorites", newArray);
  }

  removeFavorite = (event, gif) => {
    let index = this.state.favorites.indexOf(gif);
    if (index > -1) {
      let newArray = this.state.favorites.slice();
      newArray.splice(index, 1);
      this.setState({
        favorites: newArray
      });

      localStorage.setItem("favorites", newArray);
    }
  }

  render() {
    return (
      <section>
        <PageHeader>
          giphyNow
        </PageHeader>
        <Search
          query={this.state.searchQuery}
          search={this.search}
          handleChange={this.updateQuery}
        />
        <Functionalities
          feed={this.state.gifs}
          feedAction={this.addFavorite}
          favorites={this.state.favorites}
          favoritesAction={this.removeFavorite}
        />
      </section>
    );
  }
}

export default App;
