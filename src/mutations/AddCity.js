import gql from 'graphql-tag'

export default gql`
  mutation addCity($name: String!, $country: String!, $id: ID!) {
    putCity(name: $name, country: $country, id: $id) {
      name
      country
      id
    }
  }
`
