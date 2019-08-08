import { gql } from 'apollo-boost';

const checkExistingUserQuery = gql`
  query existingUser($email: String!) {
    existingUser(email: $email) {
      email
      _id
    }
  }
`;

const getBeersQuery = gql`
  query {
    beers {
      name
      _id
      country
      state
      city
      rate
      date
      breweryName
      description
    }
  }
`;

const getBeerQuery = gql`
  query beer ($id: ID!){
    beer (_id:$id) {
      name
      _id
      country
      state
      city
      rate
      date
      breweryName
      description
    }
  }
`;

const getBreweryQuery = gql`
  query {
    brewerys {
      name
      _id
    }
  }
`


export { checkExistingUserQuery, getBeersQuery, getBeerQuery, getBreweryQuery };