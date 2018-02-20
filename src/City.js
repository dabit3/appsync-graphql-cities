import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button
} from 'react-native'

import { Icon } from 'react-native-elements'
import { compose, graphql } from 'react-apollo'
import uuidV4 from 'uuid/v4'

import CreateLocation from './mutations/CreateLocation'
import ListLocations from './queries/ListLocations'
import NewLocationSubscription from './subscriptions/NewLocationSubscription'
import Input from './Input'

const initialState = {
  modalVisible: false,
  name: '',
  info: ''
}

class City extends React.Component {
  static navigationOptions = (props) => {
    const city = props.navigation.state.params.city
    return {
      title: city.name
    }
  }
  state = initialState
  componentWillMount(){
   this.props.subscribeToNewLocations()
  }
  toggleModal() {
    this.setState(state => ({ modalVisible: !state.modalVisible }))
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  createLocation() {
    const location = {
      cityId: this.props.navigation.state.params.city.id,
      name: this.state.name,
      info: this.state.info,
      id: uuidV4()
    }
    this.props.onAdd(location)
    this.setState(initialState)
  }
  render() {
    const { locations } = this.props
    return (
      <View style={styles.container}>
        {
          locations.map((location, index) => (
            <View key={index} style={styles.location}>
              <Text style={styles.title}>{location.name}</Text>
              <Text style={styles.subtitle}>{location.info}</Text>
            </View>
          ))
        }
        <Icon
          raised
          icon
          color='white'
          onPress={this.toggleModal.bind(this)}
          underlayColor="#0091EA"
          containerStyle={styles.icon}
          name='add'
        />
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'
        >
          <View style={styles.modal}>
            <Input
              onChangeText={this.onChangeText.bind(this)}
              type='name'
              placeholder='Name'
              value={this.state.name}
            />
            <Input
              onChangeText={this.onChangeText.bind(this)}
              type='info'
              placeholder='Info'
              value={this.state.info}
            />
            <Icon
              raised
              icon
              color='white'
              onPress={this.toggleModal.bind(this)}
              underlayColor="#0091EA"
              containerStyle={styles.icon}
              name='close'
            />
            <Button
              onPress={this.createLocation.bind(this)}
              title={`Add Location to ${this.props.navigation.state.params.city.name}`}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  location: {
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .1)'
  },
  title: {
    fontSize: 20,
    fontWeight: '300'
  },
  subtitle: {
    fontSize: 14,
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  modal: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    backgroundColor: '#0091EA',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
})

export default compose(
  graphql(CreateLocation, {
    props: props => ({
      onAdd: location => props.mutate({
        variables: location,
        optimisticResponse: {
          createLocation: { ...location,  __typename: 'Location' }
        },
        update: (proxy, { data: { createLocation } }) => {
          const data = proxy.readQuery({ query: ListLocations, variables: { cityId: createLocation.cityId } });
          data.listLocations.items.unshift(createLocation);
          proxy.writeQuery({ query: ListLocations, data, variables: { cityId: createLocation.cityId } });
        }
      })
    })
  }),
  graphql(ListLocations, {
    options: props => {
      const { id } = props.navigation.state.params.city
      return {
        variables: { cityId: id },
        fetchPolicy: 'cache-and-network'
      }
    },
    props: props => {
      return {
        locations: props.data.listLocations ? props.data.listLocations.items : [],
        subscribeToNewLocations: params => {
          props.data.subscribeToMore({
            document: NewLocationSubscription,
            updateQuery: (prev, { subscriptionData: { data : { onCreateLocation } } }) => {
              return {
                ...prev,
                listLocations: {
                  items: [onCreateLocation, ...prev.listLocations.items.filter(location => location.id !== onCreateLocation.id)],
                  __typename: 'LocationConnection'
                }
              }
            }
          });
        }
      }
    }
})
)(City)
