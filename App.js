import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Create from './source/screens/Create'
import MapScreen from './source/screens/MapScreen'
import { Provider } from 'react-redux'
import MyReducers from './source/data/local/reducers/MyReducers'
import OneSignal from 'react-native-onesignal';
import MapAdvance from './source/screens/MapAdvance'

export default class App extends Component {

  constructor(props) {
    super(props)
    OneSignal.setAppId("28c4fab0-901a-4823-97c9-d45f4e735e41")
    OneSignal.setLogLevel(6, 0);
    OneSignal.addSubscriptionObserver(event => {
      console.log("OneSignal: subscription changed:", event);
    });
  }

  componentDidMount() {
    // this.createRef.handleOnCreate
  }

  render() {
    return (
      <Provider store={MyReducers}>

        <View style={{ flex: 1 }}>
          {/* <Create ref={ref => this.createRef = ref} /> */}
          <MapScreen />
          {/* <Create /> */}

          {/* <MapAdvance /> */}

        </View>
      </Provider>

    )
  }
}
