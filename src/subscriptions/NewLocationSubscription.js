import gql from 'graphql-tag'

export default gql`
subscription newLocationSub {
  putLocation {
    id
		cityId
		name
		info
  }
}`;
