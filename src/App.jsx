import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    console.log('this.state', this.state)
    const BASE_URL = 'https://api.spotify.com/v1/search?access_token=BQAjp1Q6FKZKkA02vhwvVFs9xTBiN4_okw0FvPEKYqfsSGkKS2wYPBPpcu5UXIyDdu3ANojbvIPb-9wEpDLOVK6IYIZ1H8Vt19gLgWoUb709gMx-kCYgztRx-8w3-JWGoSsnBRQMiGhr2bSuiFj9v7GyY5e9HuVoP6PPGedunzbIKGYoXih8&';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    console.log('FETCH_URL', FETCH_URL);
    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist})

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&access_token=BQAjp1Q6FKZKkA02vhwvVFs9xTBiN4_okw0FvPEKYqfsSGkKS2wYPBPpcu5UXIyDdu3ANojbvIPb-9wEpDLOVK6IYIZ1H8Vt19gLgWoUb709gMx-kCYgztRx-8w3-JWGoSsnBRQMiGhr2bSuiFj9v7GyY5e9HuVoP6PPGedunzbIKGYoXih8&`;
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const { tracks } = json;
        this.setState({tracks})
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className=".App-title">Music master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search from an Artist"
              query={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key == 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist != null
          ? <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;
