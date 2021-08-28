import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Create from './source/screens/Create'
import MapScreen from './source/screens/MapScreen'

export default class App extends Component {

  componentDidMount() {
    // this.createRef.handleOnCreate
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Create ref={ref => this.createRef = ref} /> */}
        <MapScreen />
      </View>
    )
  }
}
