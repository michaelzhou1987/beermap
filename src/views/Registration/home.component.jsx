import React, { Component } from 'react';
// import obj from './home.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageName: 'Beer Map Home',
      data: null
    };
  }

  render() {
    return (
      <div className="homepage-wrapper">
        <h1>{this.state.pageName}</h1>

      </div>
    );
  }

  componentDidMount() {

  }
}

export default Home;
