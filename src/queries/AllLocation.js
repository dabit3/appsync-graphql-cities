import gql from 'graphql-tag';

export default gql`
query allLocation($cityId: ID!) {
  allLocation(cityId: $cityId)  {
    name
    info
    id
    cityId
  }
}`;
