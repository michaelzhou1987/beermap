import React, { Component } from 'react';
// import obj from './beers.module.scss';

class Addcard extends Component {
  render() {
    return (
      <div
        className="card"
        style={{
          width: '13rem',
          marginRight: '10px',
          marginTop: '10px'
        }}
      >
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Add new</h5>
          <h5 className="card-title">&nbsp;</h5>
          <div className="card-text">&nbsp;</div>
          <div className="card-text">&nbsp;</div>
          <div className="card-text">
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
          <div className="card-text">&nbsp;</div>
          <a href="/addbeer" className="btn btn-primary">
            Add
          </a>
        </div>
      </div>
    );
  }
}

export default Addcard;
