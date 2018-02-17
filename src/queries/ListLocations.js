import gql from 'graphql-tag';

export default gql`
query listLocations($cityId: ID!) {
  listLocations(cityId: $cityId)  {
    items {
      name
      info
      id
      cityId
    }
  }
}`;
