import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from './reuseable/Header'
import Button from './reuseable/Button'
import Input from './reuseable/Input'

export default class Login extends Component {

    state = {
        userName: ""
    }

    render() {
        const { userName } = this.state
        return (
            <View style={{ flex: 1 }}>
                <Header title={"Login"} onPress={() => { this.props.navigation.goBack() }} />

                <Input
                    // icon={<MIcon name={""} size={ } />}
                    onChange={(txt) => this.setState({ userName: txt })} />

                <Button bgStyle={{ width: 100 }} title={"Login"} onPress={() => { }} />

            </View>
        )
    }
}
