import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Create from './source/screens/Create'
import MapScreen from './source/screens/MapScreen'
import { Provider } from 'react-redux'
import MyReducers from './source/data/local/reducers/MyReducers'

export default class App extends Component {

  componentDidMount() {
    // this.createRef.handleOnCreate
  }

  render() {
    return (
      <Provider store={MyReducers}>

        <View style={{ flex: 1 }}>
          {/* <Create ref={ref => this.createRef = ref} /> */}
          {/* <MapScreen /> */}
          <Create />
        </View>
      </Provider>

    )
  }
}
