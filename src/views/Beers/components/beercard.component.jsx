import React, { Component } from 'react';
// import obj from './beers.module.scss';

class Beercard extends Component {
  constructor(props) {
    super(props)
  }
  formatDate (date) {
    let d = new Date(date);

    return `${('00' + d.getMonth()).slice(-2)}-${(
      '00' + d.getDate()
    ).slice(-2)}-${d.getFullYear()}`;

  }
  render () {
    return (
      <div className="card" style={{
        width: '13rem',
        marginRight: '10px',
        marginTop: '10px'
      }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.beerInfo.name}</h5>
          <h5 className="card-title">{this.props.beerInfo.brewery}</h5>
          <div className="card-text">
            Date: {this.formatDate(this.props.beerInfo.date)}
          </div>
          <div className="card-text">Rating: {this.props.beerInfo.rate}</div>
          <div className="card-text">
            <div>City: {this.props.beerInfo.location.city}</div>
            <div>State: {this.props.beerInfo.location.state}</div>
            <div>Country: {this.props.beerInfo.location.country}</div>
          </div>
          <div className="card-text">Note: {this.props.beerInfo.comment}</div>
          <a href={`/beerdetail/${this.props.beerInfo.id}`} className="btn btn-primary">
            Go to detail
          </a>
        </div>
      </div>
    );
  }
}

export default Beercard;