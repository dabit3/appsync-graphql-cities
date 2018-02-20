import gql from 'graphql-tag'

export default gql`
subscription NewLocationSub {
  onCreateLocation {
    id
		cityId
		name
		info
  }
}`;
