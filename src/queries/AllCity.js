import gql from 'graphql-tag';

export default gql`
query allCity {
  allCity  {
    name
    country
    id
  }
}`
