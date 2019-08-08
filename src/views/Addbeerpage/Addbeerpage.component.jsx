import React, { Component } from 'react';
import axios from 'axios';
import './Addbeerpage.scss';
import { Rate, DatePicker, Button, Modal } from 'antd';
// import { NavLink } from 'react-router-dom';
import { getBreweryQuery, getBeersQuery } from '../../queries/queries';
import { CREATE_BEER, CREATE_BREWERY } from '../../queries/mutations';
import { graphql, compose, Query, ApolloConsumer } from 'react-apollo';

const dateFormat = 'MM/DD/YYYY';

class Addbeerpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      state: [],
      city: [],
      errorMsg: '',
      rate: 0,
      visible: false,
      // beerName: '',
      breweryId:'',
      breweryName: '',
      breweryCountry: '',
      breweryState: '',
      breweryCity: '',
      beerCountry: '',
      beerState: '',
      beerCity: '',
      date: '',
      description: '',
      name: ''
    };
  }
  addBeer = async () => {
    let newBeer = await this.props.CREATE_BEER({
      variables: {
        beerInput: {
          name: this.state.name,
          brewery: this.state.breweryId,
          breweryName: this.state.breweryName,
          rate: this.state.rate,
          date: this.state.date,
          country: this.state.beerCountry,
          state: this.state.beerState,
          city: this.state.beerCity,
          description: this.state.description
        }
      },
      refetchQueries: [{ query: getBeersQuery }]
    });
// console.log(newBeer)
// return
    if(!newBeer.data.createBeer) {
      window.alert('not able to create')
      return 
    }
    this.props.history.push('/beers')
  }

  findByCode = (arr, code) => {
    let result = null;
    arr.forEach(element => {
      if(element.code == code) {
        result = element.name
      }
    });
    return result
  }

  findById = (arr, id) => {
    let result = null;
    arr.forEach(element => {
      if(element._id == id) {
        result = element.name
      }
    });
    return result    
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    console.log(this.state)
    if(this.state.breweryName.trim() === '') {
      return
    }
    this.props.CREATE_BREWERY({
      variables: {
        breweryInput: {
          name: this.state.breweryName,
          country: this.state.breweryCountry,
          state: this.state.breweryState,
          city: this.state.breweryCity
        }
      },
      refetchQueries: [{
        query: getBreweryQuery
      }]
    });
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };


  async getCountryData() {
    this.setState({
      errorMsg: ''
    });

    let countryData = await axios.get(
      'http://api.geonames.org/countryInfoJSON?username=michaelzhou1987'
    );

    let tempCountry = countryData.data.geonames.map(country => {
      return {
        name: country.countryName,
        code: country.geonameId
      };
    });

    tempCountry.sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });

    for (let i = 0; i < tempCountry.length; i++) {
      if (tempCountry[i].code == '6252001') {
        let temp = tempCountry.splice(i, 1);
        tempCountry.unshift(...temp);
        break;
      }
    }

    this.setState({
      country: tempCountry
    });
  }

  async getStateInfo(countryCode) {
    this.setState({
      errorMsg: ''
    });

    let stateData = await axios.get(
      `http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=michaelzhou1987`
    );

    if (!stateData.data.geonames) {
      this.setState({
        errorMsg: stateData.data.message
      });
      return;
    }

    let tempState = stateData.data.geonames.map(state => {
      return {
        name: state.name,
        code: state.geonameId
      };
    });

    this.setState({
      state: tempState
    });
  }

  async getCityInfo(stateCode) {
    this.setState({
      errorMsg: ''
    });

    let cityData = await axios.get(
      `http://api.geonames.org/childrenJSON?geonameId=${stateCode}&username=michaelzhou1987`
    );

    if (!cityData.data.geonames) {
      this.setState({
        errorMsg: cityData.data.message
      });
      return;
    }

    let tempCity = cityData.data.geonames.map(city => {
      return {
        name: city.name,
        code: city.geonameId
      };
    });

    this.setState({
      city: tempCity
    });
  }

  render() {
    return (
      <div className="add-beer-page-wrapper">
        <h3>Add a new beer</h3>
        <form
          action="/"
          method="post"
          className="container form-wrapper"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="form-group">
            <p className="error-message">{this.state.errorMsg}</p>
          </div>

          <div className="form-group">
            <label htmlFor="inputName">Name of the beer</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Name of the beer"
              defaultValue={this.state.name}
              onChange={ e => {
                this.setState({
                  name: e.target.value
                });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputBrewery">Brewery</label>
            <select
              id="inputBrewery"
              className="form-control"
              onChange={ e => {
                let result = this.findById(this.props.getBreweryQuery.brewerys, e.target.value)
                this.setState({
                  breweryId: e.target.value,
                  breweryName: result
                });
              }}
            >
              <option defaultValue>Please choose...</option>
              {this.props.getBreweryQuery.brewerys &&
              this.props.getBreweryQuery.brewerys.length > 0
                ? this.props.getBreweryQuery.brewerys.map(brewery => {
                    return (
                      <option value={brewery._id} key={brewery._id}>
                        {brewery.name}
                      </option>
                    );
                  })
                : null}
            </select>
            <Button type="link" onClick={this.showModal}>
              Add a new brewery
            </Button>
          </div>

          <div className="form-group">
            <label htmlFor="inputBreweryName">Brewery Name</label>
            <input
              type="text"
              className="form-control"
              id="inputBreweryName"
              placeholder="input brewery name..."
              defaultValue={this.state.breweryName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputDate">Date</label>
            <DatePicker
              className="form-control isAntd"
              // defaultValue={moment('2015/01/01', dateFormat)}
              onChange={(d, s) => {
                this.setState({
                  date: s
                })
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputCountry">Country</label>
            <select
              id="inputCountry"
              className="form-control"
              onChange={e => {
                let result = this.findByCode(this.state.country, e.target.value)
                this.getStateInfo(e.target.value)
                this.setState({
                  beerCountry: result
                })
                }}
            >
              <option defaultValue>Please choose...</option>
              {this.state.country.length > 0
                ? this.state.country.map(country => {
                    return (
                      <option value={country.code} key={country.code}>
                        {country.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inputState">State</label>
            <select
              id="inputState"
              className="form-control"
              onChange={e => {
                let result = this.findByCode(
                  this.state.state,
                  e.target.value
                );
                this.getCityInfo(e.target.value)
                this.setState({
                  beerState: result
                });
              }}
            >
              <option defaultValue>Please choose...</option>
              {this.state.state.length > 0
                ? this.state.state.map(state => {
                    return (
                      <option value={state.code} key={state.code}>
                        {state.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="inputCity">City</label>
            <select id="inputCity" className="form-control" onChange={e=>{
                let result = this.findByCode(
                  this.state.city,
                  e.target.value
                ); 
                this.setState({
                  beerCity: result
                });
            }}>
              <option defaultValue>Please choose...</option>
              {this.state.city.length > 0
                ? this.state.city.map(city => {
                    return (
                      <option value={city.code} key={city.code}>
                        {city.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="" className="control-label">
              Rate This Beer
            </label>
            <Rate
              className="form-control isAntd"
              onChange={value => {
                this.setState({
                  rate: value
                });
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="control-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="5"
              style={{
                height: 'unset'
              }}
              defaultValue={this.state.description}
              onChange={e=>{
                this.setState({
                  description: e.target.value
                })
              }}
            />
          </div>

          <Button type="primary" onClick={this.addBeer}>Submit</Button>
        </form>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <form
            action=""
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div className="form-wrapper">
              <div className="form-group">
                <label htmlFor="brewery-input-name">
                  Name of the brewery
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brewery-input-name"
                  placeholder="Name of the brewery"
                  onChange={e => {
                    this.setState({
                      breweryName: e.target.value
                    });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="brewery-inputCountry">Country</label>
                <select
                  id="brewery-inputCountry"
                  className="form-control"
                  onChange={e => {
                    let result = this.findByCode(
                      this.state.country,
                      e.target.value
                    );

                    this.getStateInfo(e.target.value);
                    this.setState({
                      breweryCountry: result
                    });
                  }}
                >
                  <option defaultValue>Please choose...</option>
                  {this.state.country.length > 0
                    ? this.state.country.map(country => {
                        return (
                          <option value={country.code} key={country.code}>
                            {country.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="brewery-inputState">State</label>
                <select
                  id="brewery-inputState"
                  className="form-control"
                  onChange={e => {
                    let result = this.findByCode(
                      this.state.state,
                      e.target.value
                    );
                    this.getCityInfo(e.target.value);
                    this.setState({
                      breweryState: result
                    });
                  }}
                >
                  <option defaultValue>Please choose...</option>
                  {this.state.state.length > 0
                    ? this.state.state.map(state => {
                        return (
                          <option value={state.code} key={state.code}>
                            {state.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brewery-inputCity">City</label>
                <select
                  id="brewery-inputCity"
                  className="form-control"
                  onChange={e => {
                    console.log(e.target.value);
                    let result = this.findByCode(
                      this.state.city,
                      e.target.value
                    );
                    console.log(result);
                    this.setState({
                      breweryCity: result
                    });
                  }}
                >
                  <option defaultValue>Please choose...</option>
                  {this.state.city.length > 0
                    ? this.state.city.map(city => {
                        return (
                          <option value={city.code} key={city.code}>
                            {city.name}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    this.getCountryData();
    console.log(this.props)
  }
}

export default compose(
  graphql(getBreweryQuery, {
    name: 'getBreweryQuery'
  }),
  graphql(CREATE_BEER, {
    name: 'CREATE_BEER'
  }),
  graphql(CREATE_BREWERY, {
    name: 'CREATE_BREWERY'
  })
)(Addbeerpage);
