import gql from 'graphql-tag';

export default gql`
query getLocations($cityId: ID!) {
  getLocations(cityId: $cityId)  {
      locations {
        name
        info
        id
        cityId
      }
    }
}`;
