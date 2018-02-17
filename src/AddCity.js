import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import Input from './Input'

import uuidV4 from 'uuid/v4'
import { compose, graphql } from 'react-apollo'
import CreateCityMutation from './mutations/CreateCity'
import ListCities from './queries/ListCities'

const initialState = {
  name: '',
  country: ''
}

class AddCity extends Component {
  state = initialState

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }

  addPost() {
    this.props.onAdd({
      ...this.state,
      id: uuidV4()
    })
    this.props.navigation.navigate('Cities')
    this.setState(initialState)
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={this.onChangeText.bind(this)}
          placeholder='Name'
          type='name'
          value={this.state.name}
        />
        <Input
          onChangeText={this.onChangeText.bind(this)}
          placeholder='Country'
          type='country'
          value={this.state.country}
        />
        <Button
          title="Add City"
          onPress={this.addPost.bind(this)}
        />
      </View>
    );
  }
}

export default compose(
  graphql(CreateCityMutation, {
    props: props => ({
      onAdd: city => props.mutate({
        variables: city,
        optimisticResponse: data => ({
          createCity: { ...city,  __typename: 'City' }
        }),
        update: (proxy, { data: { createCity } }) => {
          const data = proxy.readQuery({ query: ListCities });
          console.log('data:' , data)
          data.listCities.items.unshift(createCity);
          proxy.writeQuery({ query: ListCities, data });
        }
      })
    })
  })
)(AddCity)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  }
});
