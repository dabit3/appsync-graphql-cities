import gql from 'graphql-tag';

export default gql`
query GetCities {
  getCities  {
      cities {
        name
        country
        id
      }
    }
}`;
