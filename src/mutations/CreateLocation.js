import gql from 'graphql-tag';

export default gql`
  mutation createLocation($cityId: ID!, $name: String!, $id: ID!, $info: String) {
    createLocation (
      input: {
        cityId: $cityId
        name: $name
        info: $info
        id: $id
      }
    ) {
      cityId
      name
      info
      id
    }
  }
`
