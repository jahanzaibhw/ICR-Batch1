import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Login from './source/screens/Login'

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Login />
      </View>
    )
  }
}
