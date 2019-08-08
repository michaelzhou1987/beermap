import React, { Component }  from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from './components/navbar/navbar.component';
import { PageHeader } from 'antd';
import { Route } from "react-router-dom";
import { graphql, compose, Query, ApolloConsumer } from 'react-apollo';
import { AUTH } from './queries/mutations';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogInUser: false,
      nickname: '',
      role: ''
    }
  }
  goBack() {
    this.props.history.go(-1);
  }

  async getAuth() {
    let authData = await this.props.AUTH({
      variables: {
        check: 1
      }
    });
    
    if(!authData) {
      return;
    }
    // console.log('__________',authData)

    await this.setState({
      isLogInUser: true,
      nickname: authData.data.checkAuth.nickname,
      role: authData.data.checkAuth.role
    });

  }

  render () {
    return (
      <div className="app-root">
        <Route render={props=>{
          return (
            <Navbar
              {...props}
              isLogInUser={this.state.isLogInUser}
              nickname={this.state.nickname}
              onSignout={(e)=>{
                this.setState({
                  isLogInUser: false,
                  nickname: '',
                  role: ''
                });
              }}
              onSignin={this.getAuth.bind(this)}
            />
          );
        }}/>
        <PageHeader onBack={e => this.goBack(e)} title="page title" />
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
  componentWillMount() {
    this.getAuth();
  }

  componentDidMount() {
    
  }
  

}

export default graphql(AUTH, {name: "AUTH"})(App);
