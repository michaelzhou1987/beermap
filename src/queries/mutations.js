import { gql } from 'apollo-boost';

const CREATE_USER = gql`
  mutation(
    $userInput: UserInput
  ) {
    createUser(
      userInput: $userInput
    ) {
      email
      pwd
      nickname
      firstName
      lastName
      phoneNumber
      _id
    }
  }
`;

const LOGIN = gql`
  mutation ($email: String!, $pwd: String!, $rememberMe: Boolean!) {
    login(email: $email, pwd: $pwd, rememberMe: $rememberMe) {
      token
    }
  }
`;

const AUTH = gql`
  mutation($check: Int!) {
    checkAuth(check: $check) {
      nickname,
      role
    }
  }
`;

const CREATE_BREWERY = gql`
  mutation($breweryInput: BreweryInput) {
    createBrewery (breweryInput: $breweryInput){
      _id,
      name
    }
  }
`
const CREATE_BEER = gql`
  mutation(
    $beerInput: BeerInput
    ) {
    createBeer (beerInput: $beerInput){
      _id,
      name
    }
  }
`;

export { CREATE_USER, LOGIN, AUTH, CREATE_BREWERY, CREATE_BEER };
