import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'

const Input = ({
  onChangeText,
  type,
  value,
  placeholder
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      autoCorrect={false}
      onChangeText={val => onChangeText(type, val)}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 50,
    borderRadius: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#0091EA' 
  }
})

export default Input