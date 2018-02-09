import gql from 'graphql-tag';

export default gql`
query AllCity {
    allCity  {
      cities {
        name
        country
        id
      }
    }
}`;
