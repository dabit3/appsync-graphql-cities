import gql from 'graphql-tag'

export default gql`
subscription NewCitySub {
  putCity {
    name
    country
    id
  }
}`;
