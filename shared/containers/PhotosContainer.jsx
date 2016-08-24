import React from 'react';
import { Container } from 'redix';
import { Link } from 'react-router';
import Photos from '../components/Photos';

class PhotosContainer extends Container {
  constructor(props) {
    super(props);
    this.setComponent(Photos, { enablePropFuncToThis: props });
    this.bindThis('fetchPhotos');
    this.state = { photos: [], page: -1};
    this.setProps({ photos: 'this.state.photos' });
  }

  setProps(props) {
    this.childComponentProps = Object.assign({}, this.childComponentProps, props);
  }
  
  componentDidMount() {
    this.fetchPhotos();
  }
  fetchPhotos() {
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
}

export default PhotosContainer;
