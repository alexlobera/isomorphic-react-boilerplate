import React from 'react';
import es6Promise from 'es6-promise';
import { Link } from 'react-router';

class Photos extends React.Component {
  constructor() {
    super();
    this.state = { photos: [], page: -1};
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    fetch('http://jsonplaceholder.typicode.com/photos/', {
      method: 'get'
    }).then((response) => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json(response);
    })
    .then((photos) => {
      const itemsPerPage = 20;
      this.setState({page: this.state.page + 1});
      this.setState({photos : photos.slice(this.state.page, itemsPerPage)});
    });
  }
  render() {
    return (
      <div>
        <h1>Photos</h1>
        <Link to="/">
          home
        </Link>
        <button onClick={this.fetch}>Next</button>
        <ul>
          {
            this.state.photos.map(photo => (
              <Link to={'/photos/' + photo.id} key={photo.id}>
                <img src={photo.thumbnailUrl} />
              </Link>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Photos;
