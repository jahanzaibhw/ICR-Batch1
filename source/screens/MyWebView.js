import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

export default class MyWebView extends Component {

    state = {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: 'https://reactnative.dev/' }}
                //javaScriptEnabled={true}                
                />
            </View>
        )
    }
}
