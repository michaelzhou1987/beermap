import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
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
        <p>This project is under development.</p>
        <p>This is a demo.</p>

        <p>Backend is running node.js (express) in a docker container.</p>

        <p>API is created with GraphQL</p>

        <p>Thank you.</p>

        <p>
          Default test user account is:
          <br />
          a@a.com
          <br />
          123456
          <br />
          You can also regist your own account.
          <br />
          JSON Web Token is used for user authoritarian
          <br/>
          You can start exploring by adding a beer info.
          <NavLink to="/addbeer">Add Beer</NavLink>
        </p>
      </div>
    );
  }

  componentDidMount() {

  }
}

export default Home;
