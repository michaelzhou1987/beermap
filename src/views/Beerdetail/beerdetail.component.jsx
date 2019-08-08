import React, { Component } from 'react';
// import obj from './home.module.scss';
import { graphql, compose } from 'react-apollo';
import { getBeerQuery } from '../../queries/queries';
import Loading from '../../components/loading/loading.component';

class Beerdetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageName: 'Beer Map beerdetail',
      data: null
    };
  }

  render() {
    return (
      <div className="beer-detail-wrapper">
        <h1>{this.state.pageName}</h1>
        {this.props.data.loading ? (
          <Loading />
        ) : (
          <div>
            Beer Name: {this.props.data.beer.name}
            <br/>
            Brewery: {this.props.data.beer.breweryName}
            <br/>
            Description: {this.props.data.beer.description}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props);
  }
}

export default graphql(getBeerQuery, { options: props => {
  return {
    variables: {id:props.match.params.id}
  }
}
})(
  Beerdetail
);
