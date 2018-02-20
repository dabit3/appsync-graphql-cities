import gql from 'graphql-tag'

export default gql`
subscription NewCitySub {
  onCreateCity {
    name
    country
    id
  }
}`;
