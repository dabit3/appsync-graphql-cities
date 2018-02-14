import gql from 'graphql-tag'

export default gql`
subscription NewLocationSub {
  putLocation {
    id
    cityId
    name
    info
  }
}`;
