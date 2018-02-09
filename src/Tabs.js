import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Image, StyleSheet } from 'react-native'

import AddCity from './AddCity'
import Cities from './Cities'

const tabs = {
  Cities: {
    screen: Cities,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image
          style={[styles.icon, { tintColor }]}
          source={require('./assets/list.png')}
        />
      )
    }
  },
  AddCity: {
    screen: AddCity,
    navigationOptions: {
      title: 'Add City',
      tabBarIcon: ({ tintColor }) => (
        <Image
          style={[styles.icon, { tintColor }]}
          source={require('./assets/plus.png')}
        />
      )
    }
  }
}

const config = {
  tabBarOptions: {
    activeTintColor: '#0091EA',
    inactiveTintColor: '#666',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
    }
  }
}

export default TabNavigator(tabs, config)

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 26
  }
})
