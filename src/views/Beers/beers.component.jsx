import React, { Component } from 'react';
import style from './beers.module.scss';
import { Card, Icon, Button, Rate } from 'antd';
import { NavLink } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import { getBeersQuery } from "../../queries/queries";
import Loading from "../../components/loading/loading.component";

const { Meta } = Card;

class Beers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageName: 'Beer Map My Beers',
    };
  }

  formatDate(date) {
    let d = new Date(date);

    return `${('00' + d.getMonth()).slice(-2)}-${('00' + d.getDate()).slice(
      -2
    )}-${d.getFullYear()}`;
  }

  render() {
    return (
      <div className={style['my-beers-wrapper']}>
        <NavLink to="/addbeer">Add more beer</NavLink>
        <div className={style['my-beers-list']}>
          {this.props.getBeersQuery.loading ? (
            <Loading />
          ) : (
            this.props.getBeersQuery.beers.map(beer => {
              return (
                <Card
                  key={beer._id}
                  style={{
                    width: 300,
                    marginRight: 10,
                    marginBottom: 10
                  }}
                  cover={
                    <img
                      alt="example"
                      src="..."
                      style={{ width: 300, height: 200 }}
                    />
                  }
                  actions={[
                    <Icon
                      onClick={e => {
                        this.props.history.push(
                          `/beerdetail/${beer._id}?edit=true`
                        );
                      }}
                      type="edit"
                    />,
                    <Icon type="delete" />
                  ]}
                >
                  <Meta
                    // avatar={<Avatar src="..." />}
                    title={beer.name}
                    // description={beer.brewery}
                  />
                  <p>Brewery: {beer.breweryName}</p>
                  <p>Country: {beer.country}</p>
                  <p>City: {beer.city}</p>
                  <p>{beer.date}</p>
                  <div>
                    <Rate disabled defaultValue={beer.rate} />
                  </div>
                  <div className={style['button-wrapper']}>
                    <Button
                      type="primary"
                      onClick={e => {
                        this.props.history.push(
                          `/beerdetail/${beer._id}?edit=false`
                        );
                      }}
                    >
                      Go to Detail
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('mount', this.props.getBeersQuery.loading)
  }
  componentDidUpdate() {
    console.log('update', this.props.getBeersQuery)
  }
}

export default graphql(getBeersQuery, {name: 'getBeersQuery'})(Beers);
