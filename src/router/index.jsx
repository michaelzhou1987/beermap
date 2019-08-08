import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import Loadable from 'react-loadable';
import Loading from '../components/loading/loading.component';

import App from '../App';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

function isLogIn() {
  return false;
}

const Home = Loadable({
  loader: () => import('../views/Home/home.component'),
  loading: Loading
});

const Beers = Loadable({
  loader: () => import('../views/Beers/beers.component'),
  loading: Loading
});

const Beerdetail = Loadable({
  loader: () => import('../views/Beerdetail/beerdetail.component'),
  loading: Loading
});

const Addbeerpage = Loadable({
  loader: () => import('../views/Addbeerpage/Addbeerpage.component'),
  loading: Loading
});

const Registration = Loadable({
  loader: () => import('../views/Registration/registration.component'),
  loading: Loading
});

// import Home from '../views/Home/home.component';
// import Beers from '../views/Beers/beers.component';

// add authentication
const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:8000/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('beermapAuth');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const router = (
  <ApolloProvider client={ client }>
    <Router>
    <Route render = { props => {
      return (
        <App {...props}>
            <TransitionGroup>
              <CSSTransition
                key={props.location.key}
                timeout={{ enter: 1000, exit: 0}}
                classNames={'fade'}
              >
                <Switch>
                  <Route
                    path="/home"
                    render={props => {
                      return <Home {...props} title="Home Page"/>;
                    }}
                  />
                  <Route
                    path="/beers"
                    render={props => {
                      return <Beers {...props} title="My Beers"/>;
                    }}
                  />
                  <Route
                    path="/beerdetail/:id"
                    render={props => {
                      return <Beerdetail {...props} />;
                    }}
                  />

                  <Route
                    path="/addbeer"
                    render={props => {
                      return <Addbeerpage {...props} />;
                    }}
                  />

                  <Route
                    path="/registration"
                    render={props => {
                      
                      return !isLogIn() ? (
                        <Registration {...props} />
                      ) : (
                        <Redirect
                          to="/home"
                        />
                      );
                    }}
                  />


                  <Redirect from="/" to="/home" exact />
                  <Redirect from="*" to="/home" exact />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
        </App>
      );
    }}/>
    </Router>
  </ApolloProvider>
);

export default router;