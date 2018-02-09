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
import Cities from './Cities'
import AddCityMutation from './mutations/AddCity'

class AddCity extends Component {
  state = {
    name: '',
    country: ''
  }

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
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={this.onChangeText}
          placeholder='Name'
          type='name'
          value={this.state.name}
        />
        <Input
          onChangeText={this.onChangeText}
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
  graphql(AddCityMutation, {
    props: props => ({
      onAdd: city => props.mutate({
        variables: city,
        optimisticResponse: () => ({ putCity: { ...city, __typename: 'City' } }),
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
