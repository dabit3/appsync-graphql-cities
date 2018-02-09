import gql from 'graphql-tag';

export default gql`
  mutation addLocation($cityId: ID!, $name: String!, $id: ID!, $info: String) {
    putLocation (
      cityId: $cityId
      name: $name
      info: $info
      id: $id
    ) {
      cityId
      name
      info
      id
    }
  }
`
